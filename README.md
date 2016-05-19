## dreamcatcher

Use nightmare.js to automate tricky download / scraping scenarios.

Currently just a collection of rough demo scripts.

### install

```
git clone https://github.com/blahah/dreamcatcher.git
cd dreamcatcher
npm install
```

### usage

Download from a site that tries to prevent automated downloads with lazy-loading javascript

```
./withclick.js URL button-selector
```

Download content that requires a login


```
./withlogin.js URL user pass
```
