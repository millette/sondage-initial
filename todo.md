# TODO

From the project directory (where the file you're reading is), follow these steps.

## Generate keys `gen-keys`

_Browser, localhost only_

```sh
cd gen-keys/
npm run dev # will launch default browser
# click on both keys in the browser to save them
# CTRL-C on the command-line when both keys are saved
```

1. generate key pair
1. export public jwk (manually save to json file)
1. export private jwk (manually save to json file)

## Write and generate survey

_Command-line_

1. edit `questions.md` with your survey
1. copy public jwk from `Generate keys` to current directory
1. generate `questions.html`
1. `npm run build`
1. `dist/` directory should contain generated `questions.html`, `main.css` and `style.css` files

## Host survey

_Browser, public web_

1. Copy `dist/` directory to web server
1. Configure web server
1. Voilà!

## Read answers

_Browser, localhost only_

1. copy private jwk from `Generate keys` to current directory
1. `npm run build`
1. `dist/` directory should contain your private survey reader
1. Launch private (localhost only) web server in `dist/`
1. Visit localhost url and view private survey responses
