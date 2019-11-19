# From Markdown to HTML survey with encrypted responses

From the project directory (where the file you're reading is), follow these steps.

## Generate keys `gen-keys`

_Browser, localhost only_

```sh
cd gen-keys/
npm run dev # will launch default browser
# click on both keys in the browser to save them
# CTRL-C on the command-line when both keys are saved
```

## Write and generate survey

_Command-line_

```sh
cd gen-survey/
cp questions-sample.md questions.md # Use as template if needed
edit questions.md # Replace "edit" with your prefered editor
cp /PATH/TO/SAVE/public-jwk.json . # replace /PATH/TO/SAVE/ with path from `Generate keys` step
npm run init # run once and follow instructions to create your .env file
npm run gen # Generate html form from markdown; rerun when you edit the markdown
npm run dev # will launch default browser
# CTRL-C on the command-line when satisfied
npm run build # Production build in dist/
```

### Host survey

_Browser, public web_

1. Copy `dist/` directory to web server
1. Configure web server
1. Voilà!

## Read answers

_Browser, localhost only_

```sh
cd gen-reader/
cp ../gen-survey/.env . # copy JSONSTOREIO token
cp /PATH/TO/SAVE/private-jwk.json . # replace /PATH/TO/SAVE/ with path from `Generate keys` step
npm run dev # will launch default browser
# CTRL-C on the command-line when satisfied
npm run build # Production build in dist/ - ALWAYS KEEP PRIVATE!
```
