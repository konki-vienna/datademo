const sketch = require('sketch')
const { DataSupplier } = sketch
const util = require('util')

export function onStartup () {
  // To register the plugin, uncomment the relevant type:
  DataSupplier.registerDataSupplier('public.text', 'datademo', 'SupplyData')
  // DataSupplier.registerDataSupplier('public.image', 'datademo', 'SupplyData')
}

export function onShutdown () {
  // Deregister the plugin
  DataSupplier.deregisterDataSuppliers()
}

export function onSupplyData (context) {
  console.log("C O N T E X T:")
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  const myLength = items.length;
  getNames(context, myLength, "female", "austria");
}

export function getNames(myContext, myAmount, myGender, myRegion) {
  const url = "https://uinames.com/api/?amount=" + myAmount + "&gender=" + myGender + "&region=" + myRegion;
  let myNames;
  let dataKey = myContext.data.key
  const items = util.toArray(myContext.data.items).map(sketch.fromNative)

  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      let index = 0;
      return data.map(function(userName) {
        console.log(userName);
        let name = (userName.name + " " + userName.surname)
        DataSupplier.supplyDataAtIndex(dataKey, name, index)
        index++
      })      
  })
  .catch(function(error) {
    console.log(error);
  });
}
