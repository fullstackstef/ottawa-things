module.exports = (temp, product) => {
  let output = temp.replace(/{%SITENAME%}/g, product.siteName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%ADDRESS%}/g, product.address);
  output = output.replace(/{%PHONE%}/g, product.phone);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%RATING%}/g, product.rating);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.free) output = output.replace(/{%NOT_FREE%}/g, "not-free");
  return output;
};
