# TODO

## Generate keys `gen-keys`

Browser, localhost only:

1. generate key pair
1. export private jwk (manually save to json file)
1. export public jwk (manually save to json file)

## Write and generate survey

Command-line:

1. edit `questions.md` with your survey
1. copy public jwk from `Generate keys` to current directory
1. generate `questions.html`
1. `npm run build`
1. `dist/` directory should contain generated `questions.html`, `main.css` and `style.css` files

## Host survey

Browser, public web:

1. Copy `dist/` directory to web server
1. Configure web server
1. Voilà!

## Read answers

Browser, localhost only:

1. copy private jwk from `Generate keys` to current directory
1. `npm run build`
1. `dist/` directory should contain your private survey reader
1. Launch private (localhost only) web server in `dist/`
1. Visit localhost url and view private survey responses
