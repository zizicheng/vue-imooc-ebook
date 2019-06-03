import { getReadTime } from "./localStorage";
export const FONT_SIZE_LIST = [
  {
    fontSize: 12
  },
  {
    fontSize: 14
  },
  {
    fontSize: 16
  },
  {
    fontSize: 18
  },
  {
    fontSize: 20
  },
  {
    fontSize: 22
  },
  {
    fontSize: 24
  }
];

export const FONT_FAMILY = [
  {
    font: "Default"
  },
  {
    font: "Cabin"
  },
  {
    font: "Days One"
  },
  {
    font: "Montserrat"
  },
  {
    font: "Tangerine"
  }
];

export function themeList(vue) {
  return [
    {
      alias: vue.$t("book.themeDefault"),
      name: "Default",
      style: {
        body: {
          color: "#4c5059",
          background: "#cecece"
        }
      }
    },
    {
      alias: vue.$t("book.themeGold"),
      name: "Gold",
      style: {
        body: {
          color: "#5c5b56",
          background: "#c6c2b6"
        }
      }
    },
    {
      alias: vue.$t("book.themeEye"),
      name: "Eye",
      style: {
        body: {
          color: "#404c42",
          background: "#a9c1a9"
        }
      }
    },
    {
      alias: vue.$t("book.themeNight"),
      name: "Night",
      style: {
        body: {
          color: "#cecece",
          background: "#000000"
        }
      }
    }
  ];
}

const addCss = (function() {
  let link = null;
  let head = document.getElementsByTagName("head")[0];
  return function(href) {
    if (!link) {
      link = document.createElement("link");
    }
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", href);
    head.appendChild(link);
  };
})();

export { addCss };

export function getReadTimeByMinute(fileName) {
  const readTime = getReadTime(fileName);
  if (!readTime) {
    return 0;
  } else {
    return Math.ceil(readTime / 60);
  }
}

export function flatten(array) {
  return [].concat(
    ...array.map(item => [].concat(item, ...flatten(item.subitems)))
  );
}
