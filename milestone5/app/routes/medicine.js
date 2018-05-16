exports.viewAllMed = (req, res) =>
{
  const profile_id = req.params.profile_id;
  res.render('viewAllMed',
  {
    backbuttonShow: true,
    pageTitle: "Current Medications",
    profile_id: profile_id
  });
}


exports.viewPillDetail = (req, res) =>
{
  res.render('viewPillDetail',
  {
    backbuttonShow: true,
    pageTitle: "Medication Detail"
  });
};


exports.addNewMed = (req, res) =>
{
  const color = ['red', 'orange', 'yellow', 'green', 'blue', 
                 'purple', 'black', 'gray', 'white'];
  const colorList = color.map( (e) => { return {color: e} } );  
  console.log(colorList);
  res.render('addNewMed',
  {
    backbuttonShow: true,
    pageTitle: "Add New Medicine",
    profile_id: req.params.profile_id,
    shapeList: [{type: 'split'}, {type: 'hole'}, {type: 'circle'}, {type: 'oval'}],
    colorList: colorList
  });
};

/** 
 * Helper function for rendering error page; this code needed in every
 * function that makes a request, so this function prevents rewriting
 * same code
 */
function renderError(page, response, body, res)
{
  console.log(body);
  res.render(page, 
  {
    errorStatus: response.statusCode+': '+response.statusMessage,
    errorMessage: body.error || body.message
  });
}

