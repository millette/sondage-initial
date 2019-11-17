import dec from "./dec"

console.log('HELLO')

const str = "p+7Nfy6Hwk45nGTfAdqG1Cq0jR7iCM37tIvCgBaVf0Gckir/BdwgSkRosJGdHBN6b1T+yT6uSHlQmxe30czX8f/9Z8rxCxh2dk+PYatvzU3soWmxhIJ5CoXyPFWk1uaD1lOCmV4ICaAFBsJy5+uASQBuG0w8sTj97dVgGjtbHgaFP/SH5pmehbPGnDrhrZq/yfqQFGPY1rn22yY8CZg2OTCKL+OSpyevgUgM+VXCuM83Hehg45NmH9NTspnckFcJYG6BhD2vokZjU/wCPnLRqMx1jctr7DMIYy1+4KPPZZq5UWpQDPLy6mUQgJxD5iw2Df8KttiwqoGqg2GPB+406O6ZaK8pErhORIfXcsERSU5NpqxO799qrpId2yNk6kTZJy1S3O9zVNPZ/gCAMzmxYLIgOHIZp4qmQb05zovm4n6KWXeLJo40udeFm3t/KCrEiGFPuA75FhYSLv4bVEL+PVz09yJraOg1ys6epgMZTsJ7T0r7mt7A1YzINDgE9r3NOvWC/depm3ebbPMo8D67m4Ob++HRfFeBu7Xd23MK6ymJScmg3mopFpZUC0rqoSsL13n+E2/P905qSJztC4ny31KHksfwHjPE9kjqlz0ePS0Xzd7/ydUglqSN2QJctX5uPMGhblZe4CAC/t707fBG1TiGr+3h/pnoH1po8lGWCEk="

const woot = (s) => {
  console.log('WOOT')

  return dec()
    .then((x) => {
      console.log('W2', x)
      return x(s)
    })
    .then((x) => {
      console.log('W3', x)
      return x
    })
}

const done = (x) => {
  console.log('DONE', x)
  /*
  const pre = document.createElement("pre")
  pre.innerText = JSON.stringify(x, null, 2)
  document.querySelector("body").appendChild(pre)
  */
}

woot(str)
.then(done)
.catch(console.error)
