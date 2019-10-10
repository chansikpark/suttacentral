import logging
import json

import polib
import regex
import lxml

from .util import iter_sub_dirs, humansortkey


import sys

current_module = sys.modules[__name__]


class PoProcessingError(Exception):
    pass


def remove_leading_zeros(string):
    return regex.sub(r'([A-Za-z.])0+', r'\1', string)


def strip_number_from_title(title):
    title = title.replace('​', '')
    return regex.sub(r'[\d\.\{\} –-]*', '', title, 1)


def sanitize_title(title):
    # If stripping the number returns an empty string, return that so suttaplex picks up
    # the root title instead.
    return strip_number_from_title(title)


def tilde_to_html_lists(po):
    for entry in po:
        if '~' in entry.msgstr:
            if not entry.msgstr.startswith('~'):
                raise ValueError(
                    'Case not handled: msgstr contains but does not start with ~'
                )

            entry.msgstr = (
                '<ol><li>'
                + '</li><li>'.join(entry.msgstr.split('~')[1:])
                + '</li></ol>'
            )


def ref_match_repl(m):
    return ''.join(
        '<a class="{}" id="{}"></a>'.format(_class, _id)
        for _class, _id in zip(m.captures(1), m.captures(2))
    )


def clean_html(string):
    out = regex.sub(r'<html>.*<body>', r'', string, flags=regex.DOTALL).replace(
        '\n', ' '
    )
    out = out.replace('HTML: ', '')
    out = regex.sub(r'REF: (?:([a-z]+)([\w.-]+),?\s*)+', ref_match_repl, out)
    out = regex.sub(r'>\s*VAR.*?<', '><', out)
    out = out.replace('</p>', '</p>\n')
    out = out.replace('</blockquote>', '</blockquote>\n')
    root = lxml.html.fromstring(out)
    out = lxml.html.tostring(root, encoding='unicode')
    return out


def load_info(po_file):
    """Info files contain metadata about the project"""
    po = polib.pofile(po_file)

    data = {entry.msgid.strip(): entry.msgstr.strip() for entry in po}
    try:
        return {
            'author': data['translation_author_uid'],
            'author_blurb': data['translation_author_blurb'],
            'publication_date': get_publication_date(data['translation_author_blurb']),
            'root_author': data['root_author_uid'],
            'root_author_blurb': data['root_author_blurb'],
            'root_publication_date': get_publication_date(data['root_author_blurb']),
        }
    except KeyError:
        logging.error(f'When processing file {po_file}')
        raise


def get_publication_date(author_blurb):
    root = lxml.html.fromstring(author_blurb)
    e = root.cssselect('.publication-date')
    if e:
        return e[0].text
    else:
        return None


def extract_strings_from_po(po):
    markup = []
    msgids = {}
    msgstrs = {}

    for entry in po:
        markup.append(entry.comment + f'<sc-seg id="{entry.msgctxt}"></sc-seg>')
        if entry.msgid:
            msgids[entry.msgctxt] = entry.msgid
        if entry.msgstr:
            msgstrs[entry.msgctxt] = entry.msgstr

    markup = clean_html(''.join(markup))

    return {'markup': markup, 'msgids': msgids, 'msgstrs': msgstrs}


def extract_headings_from_po(po):
    # If the title only contains numbers, an empty string is returned so the
    # suttaplex only picks up the original title instead.
    found = {'tr': {}, 'root': {}}
    for string, key in (('<h1', 'title'), ('class="division"', 'division')):
        tr_strings = []
        root_strings = []
        for entry in po[:10]:
            if string in entry.comment:
                found['tr'][key] = sanitize_title(entry.msgstr)
                found['root'][key] = sanitize_title(entry.msgid)
    return found


def process_dir(change_tracker, po_dir, authors, info, storage_dir):
    """Process po files in folder

    Note that this function operates recursively, a file called "info.po"
    will apply data to all files in the same folder, or in subfolders,
    but not of course parent or sibling folders.

    """

    info_file = next(po_dir.glob('info.po'), None)

    # don't modify passed object
    info = info.copy()

    if info_file:
        local_info = load_info(info_file)
        info.update(local_info)

    po_files = (f for f in po_dir.glob('*.po') if f.stem != 'info')
    get_volpage = VolpageGetter()
    for po_file in sorted(po_files, key=humansortkey):
        if change_tracker and not change_tracker.is_file_new_or_changed(po_file):
            continue

        po = polib.pofile(po_file)

        tilde_to_html_lists(po)

        headings = extract_headings_from_po(po)
        data = extract_strings_from_po(po)

        uid = remove_leading_zeros(po_file.stem)

        root_author_data = get_author(info['root_author'], authors)
        author_data = get_author(info['author'], authors)

        mtime = po_file.stat().st_mtime

        markup_storage_file = (
            storage_dir / f'{uid}_{info["root_author"]}.html'
        ).resolve()
        msgstrs_storage_file = (storage_dir / f'{uid}_{info["author"]}.json').resolve()
        msgids_storage_file = (
            storage_dir / f'{uid}_{info["root_author"]}.json'
        ).resolve()

        volpage = get_volpage(data['markup'], po_file.relative_to(po_dir))

        with markup_storage_file.open('w') as f:
            f.write(data['markup'])
        with msgstrs_storage_file.open('w') as f:
            json.dump(data['msgstrs'], f)
        with msgids_storage_file.open('w') as f:
            json.dump(data['msgids'], f)

        should_include_strings = True
        if not data['msgstrs']:
            should_include_strings = False

        try:
            root_division_title = headings['root']['division']
        except KeyError as e:
            logging.error(f'Could not determine root division title for {str(po_file)}')
            root_division_title = ''

        try:
            tr_division_title = headings['tr']['division']
        except KeyError as e:
            logging.error(
                f'Could not determine translation division title for {str(po_file)}'
            )
            tr_division_title = ''

        # This doc is for root strings
        yield {
            'uid': uid,
            'markup_uid': uid,
            'lang': info['root_lang'],
            'author': root_author_data[0],
            'author_short': root_author_data[1],
            'author_uid': info['root_author'],
            'author_blurb': {
                info['tr_lang']: info['root_author_blurb']
                # Note there might be blurbs in other languages
                # also root language blurb probably wont exist
                # because that would be i.e. in pali!
            },
            'publication_date': info['root_publication_date'],
            'strings_path': str(msgids_storage_file),
            'title': headings['root']['title'],
            'division_title': root_division_title,
            'volpage': volpage,
            'mtime': mtime,
        }

        if should_include_strings:
            # This doc is for the translated strings
            yield {
                'uid': uid,
                'markup_uid': uid,
                'lang': info['tr_lang'],
                'author': author_data[0],
                'author_short': author_data[1],
                'author_uid': info['author'],
                'author_blurb': {info['tr_lang']: info['author_blurb']},
                'publication_date': info['publication_date'],
                'strings_path': str(msgstrs_storage_file),
                'title': headings['tr']['title'],
                'division_title': tr_division_title,
                'mtime': mtime,
            }

        # this doc is for the markup
        yield {'uid': uid, 'markup_path': str(markup_storage_file), 'mtime': mtime}

    sub_folders = (f for f in po_dir.glob('*/'))
    for sub_folder in sorted(sub_folders, key=humansortkey):
        yield from process_dir(
            change_tracker, sub_folder, authors, info=info, storage_dir=storage_dir
        )


def get_author(author_uid, authors):
    for item in authors:
        if item['uid'] == author_uid:
            return item['long_name'], item['short_name']

    return None, None


def load_po_texts(change_tracker, po_dir, db, additional_info_dir, storage_dir):
    """ Load strings and markup from po files into database
    
    each strings entry looks like this:

    {
        "path": "en/dn2/sujato",
        "lang": "en",
        "uid": "dn2",
        "author": "sujato",
        "author_blurb": {
            "en": "Awesome translation by Sujato"
        },
        "markup" "dn2",
        "strings": {...}
    }
    
    while a markup entry looks like this:
    
    {
        "uid": "dn2",
        "markup": "..."
    }
    """

    print('Loading PO texts')

    author_file = additional_info_dir / 'author_edition.json'

    with author_file.open('r', encoding='utf-8') as authorf:
        authors = json.load(authorf)

    # It's a little hard to properly manage deleted po files,
    # as it happens deletion is really rare: so if a deletion
    # does occur we just nuke and rebuild.

    deleted_po = [f for f in change_tracker.deleted if f.endswith('.po')]
    if deleted_po or change_tracker.is_module_changed(current_module):
        change_tracker = None
        db['po_markup'].truncate()
        db['po_strings'].truncate()

    # an example path to a po file might be:
    # /dn/en/dn01 or /an/en/an01/an01.001.po

    # We expect the project dir name to be the division name
    for lang_dir in iter_sub_dirs(po_dir):
        if '-' in lang_dir.stem:
            root_lang, tr_lang = lang_dir.stem.split('-')
        else:
            raise ValueError(f'po subdir {lang_dir} should be of form such as pli-en')

        docs = process_dir(
            change_tracker,
            lang_dir,
            authors,
            info={'tr_lang': tr_lang, 'root_lang': root_lang},
            storage_dir=storage_dir,
        )

        markup_docs = []
        string_docs = []

        for i, doc in enumerate(docs):
            if 'markup_path' in doc:
                doc['_key'] = f'{doc["uid"]}_markup'
                markup_docs.append(doc)

            else:
                doc['_key'] = f'{doc["lang"]}_{doc["uid"]}_{doc["author_uid"]}'
                string_docs.append(doc)

        db['po_markup'].import_bulk_logged(markup_docs, on_duplicate='ignore')
        r = db['po_strings'].import_bulk_logged(string_docs, on_duplicate='ignore')


# Would require heavy revision once translation segmentations for languages
# other than Pali are made available 
class VolpageGetter:

    # This is made static for the case when a subfolder of
    # po-files begins with one that has no volpage and should
    # use that of the prior subfolder's last po-file.
    last_volpage = None

    # TODO: other books from KN, Vinaya, and Abhidhamma
    uid_to_ptsbook_mapping = {
        'an': 'AN',
        'dn': 'DN',
        'mn': 'MN',
        'sn': 'SN',
        'thag': 'Thag',
        'thig': 'Thig',
        'bu': 'Vin',
        'bi': 'Vin',
        'pvr': 'Vin',
    }

    # (Since six is good enough for textdata.py's PaliPageNumbinator.)
    dec_to_rom_mapping = {'1': 'i', '2': 'ii', '3': 'iii', '4': 'iv', '5': 'v', '6': 'vi'}

    def __call__(self, markup, filepath):
        # Determine PTS shorthand from file name
        ptsbook = None
        for prefix in regex.match(r'^[a-z-]+', filepath.stem)[0].split('-'):
            ptsbook = VolpageGetter.uid_to_ptsbook_mapping.get(prefix)
            if ptsbook:
                break

        # Previous regexes were obsolete.
        # Survey of markup files revealed four possible forms.
        # Always prefer second edition over first where available.
        volpages = []
        for m in regex.findall(r'<a class="pts" id="(-vp-pli|pts|2ed)(.*?)">', markup):
            num = m[1].split('.')
            if len(num) == 1:
                volpages.append(f'{ptsbook} {num[0]}')
            elif len(num) == 2:
                book = VolpageGetter.dec_to_rom_mapping.get(num[0])
                page = num[1]
                volpages.append(f'{ptsbook} {book} {page}')

        # Previously, all the jeans-&-tshirt volpages were returned concatenated with commas.
        # Here we return just the first one as suit-&-tie.
        if ptsbook:
            if len(volpages):
                VolpageGetter.last_volpage = volpages[-1]
                # TODO: There will be many instances where the returned volpage
                # is one after the true page number. We need to check whether
                # the reference occurs in the first line of content.
                # If it doesn't, the volpage should be the last one instead.
                return volpages[0]
            elif VolpageGetter.last_volpage and VolpageGetter.last_volpage.startswith(ptsbook):
                return VolpageGetter.last_volpage
        print(f'Could not determine volpage for {filepath}')
        return None
