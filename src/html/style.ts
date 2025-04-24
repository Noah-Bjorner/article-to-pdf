export default function style() {
    return `
<style>
    @font-face {
            font-family: 'ET Book Roman';
            src: url('https://static.noahbjorner.com/article-to-pdf/et-book-roman.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
          body {
            font-family: 'ET Book Roman', sans-serif;
            color: rgb(0, 0, 0);
          }
          h1 {
            font-size: 45px;
            text-align: center;
            font-weight: normal;
            margin: 0px;
            line-height: 1;
            letter-spacing: -2px;
          }
          h2 {
            width: 100%;
            font-size: 25px;
            text-align: left;
            margin-top: 20px;
            margin-bottom: 0px;
            font-weight: normal;
          }
          h3, h4, h5, h6 {
            width: 100%;
            font-size: 20px;
            text-align: left;
            margin-top: 20px;
            margin-bottom: 0px;
            font-weight: normal;
          }
          .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-bottom: 40px;
          }
          .content {
            margin: 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .footer {
                margin-top: 40px;
                text-align: center;
                font-size: 15px;
                color: rgba(0, 0, 0, 0.65);
                width: 100%;
                display: flex;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                padding-top: 20px;
                justify-content: space-between;
                text-transform: lowercase;
            }
            .footer-emphasized {
                color: rgb(0, 0, 0);
            }
          #description {
            font-size: 20px;
            text-align: center;
            font-weight: normal;
            line-height: 1.2;
          }
          #byline {
            font-size: 20px;
            font-style: italic;
            color: rgba(0, 0, 0, 0.65);
            text-align: center;
            font-weight: normal;
            text-transform: capitalize;
            line-height: 1.2;
          }
          p {
            font-size: 20px;
            font-weight: normal;
            text-align: justify;
            margin: 0px;
            line-height: 1.45;
            width: 100%;
          }
          figure {
            width: 100%;
            height: auto;
            page-break-inside: avoid;
            margin: 0px;
          }
          img {
            width: 100%;
            height: auto;
            max-height: 500px;
            object-fit: contain;
          }
          figcaption {
            font-size: 15px;
            font-style: italic;
            color: rgba(0, 0, 0, 0.65);
            text-align: center;
            margin-top: 4px;
          }
          em {
            font-style: italic;
          }
          strong {
            font-weight: bold;
          }
          del, s {
            text-decoration: line-through;
          }
          mark {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
          }
          ul, ol {
            margin: 0px;
            width: 100%;
            margin-left: 40px;
            font-size: 20px;
            line-height: 1.45;
          }
          li {
            margin-bottom: 5px;
          }
          a {
            color: blue;
            text-decoration: none;
          }
          code {
            font-family: monospace;
            font-size: 15px;
            white-space: pre-wrap;
            overflow-wrap: break-word;
          }
          pre {
            width: 100%;
            background-color: rgba(0, 0, 0, 0.05);
            padding: 20px;
            overflow-x: auto;
            margin: 0px;
            box-sizing: border-box;
            font-size: 15px;
            line-height: 1.4;
            page-break-inside: avoid;
          }
          pre code {
            padding: 0;
            background-color: transparent;
            overflow-wrap: break-word;
            word-break: break-word;
            border: none;
          }
          blockquote {
            border-left: 4px solid rgb(0, 0, 0);
            padding: 5px 20px;
            margin: 0px;
            font-style: italic;
            color: rgb(0, 0, 0);
            font-size: 20px;
            line-height: 1.45;
          }
          hr {
            border: none;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            margin-top: 20px;
            margin-bottom: 20px;
            width: 100%;
            height: 1px;
          }
          table {
            width: 100%;
            border-collapse: collapse; /* Collapse borders */
            margin: 0px;
            font-size: 20px;
            overflow: hidden;
            page-break-inside: avoid;
          }
          th, td {
            padding: 10px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            font-weight: normal;
            text-align: left;
          }
          th {
            background-color: rgba(0, 0, 0, 0.05);
          }
        </style>
    `
}