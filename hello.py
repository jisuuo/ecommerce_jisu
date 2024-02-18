import requests
from bs4 import BeautifulSoup as bs
import sys
import json


def fetch_titles(url):
    #page = requests.get('https://library.gabia.com/')
    page = requests.get(url)
    soup = bs(page.text, 'html.parser')

    elements = soup.find_all('div.esg-entry-content a > span')
    titles = []

    for element in elements:
        titles.append(element.text)
    return titles


if __name__ == '__main__':
    if len(sys.argv) > 1:
        url = sys.argv[1]
        titles = fetch_titles(url)
        print(json.dumps(titles))

    else:
        print('No URL provided')
# import requests
# from bs4 import BeautifulSoup as bs
#
# page = requests.get("https://library.gabia.com/")
# soup = bs(page.text, "html.parser")
#
# elements = soup.select('div.esg-entry-content a > span')
#
# for index, element in enumerate(elements, 1):
# 		print("{} 번째 게시글의 제목: {}".format(index, element.text))