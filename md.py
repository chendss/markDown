import time
import re
import base64
from bs4 import BeautifulSoup


def soup_tree():
    text = ''
    with open('./react单元测试技术调研.html', 'r', encoding='utf-8') as f:
        text = f.read()
    soup = BeautifulSoup(text, features='html.parser')
    return soup


def base64_img(img):
    with open(img['src'], 'rb') as f:
        base_img = base64.b64encode(f.read())
        result = 'data:image/png;base64,{}'.format(
            base_img.decode())
    return result


def img_machined(soup):
    imgs = soup.select('img')
    for img in imgs:
        if img.get('src') == None:
            continue
        else:
            src = base64_img(img)
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


def out_html(soup):
    with open('./react单元测试技术调研-a.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))


def main():
    soup = soup_tree()
    img_machined(soup)
    div_machined(soup)
    out_html(soup)


if __name__ == "__main__":
    pass
