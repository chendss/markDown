import time
import re
import os
import base64
import json
import pdfkit
from bs4 import BeautifulSoup


def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        result = f.read()
    return result


def soup_tree(folder):
    text = read_file('{}index.html'.format(folder))
    soup = BeautifulSoup(text, features='html.parser')
    return soup


def base64_img(img, folder):
    src = img['src'].replace('./', folder)
    with open(src, 'rb') as f:
        base_img = base64.b64encode(f.read())
        result = 'data:image/png;base64,{}'.format(
            base_img.decode())
    return result


def img_machined(soup, folder):
    imgs = soup.select('img')
    for img in imgs:
        if img.get('src') == None:
            continue
        else:
            src = base64_img(img, folder)
            img['src'] = src


def div_machined(soup):
    div_list = soup.select('.CodeMirror-wrap .CodeMirror-scroll')
    for div in div_list:
        div_styles = div.select_one('.CodeMirror-gutters')['style']
        height = 'auto'
        for style in div_styles.split(';'):
            if 'height' in style:
                height = style.split(':')[-1]
                break
        div['style'] = 'height: {};'.format(height)


def out_html(soup, folder, name):
    folder_path_list = folder.split('/')
    set_folder = [val for val in folder_path_list if val != ''][-1]
    folder_path = './dist/{}/'.format(set_folder)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    html_path = '{}{}.html'.format(folder_path, name)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    pdfkit.from_file(html_path, html_path.replace('.html', '.pdf'))


def config_by_path(folder):
    config_str = read_file('{}config.json'.format(folder))
    return json.loads(config_str)


def action(folder, name):
    soup = soup_tree(folder)
    img_machined(soup, folder)
    div_machined(soup)
    out_html(soup, folder, name)


def main():
    base_path = './src/'
    folder_list = [base_path+p+'/' for p in os.listdir(base_path)]
    for folder in folder_list:
        config = config_by_path(folder)
        if config['build'] == False:
            continue
        else:
            name = config['name']
            action(folder, name)


if __name__ == "__main__":
    main()
