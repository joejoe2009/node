const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
​
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
​
// I added this to create a page for the assignment
// .get('/math', (req, res) => res.render('pages/teamwork'))
// app.get('/math', (req, res) => {
//   solveMath(req, (answer) => {
//     res.render('pages/results', {
//       answer: result
//     })
//   }
//   )
// })
 
app.post(function (req, res, next) {
  next();
});
​
/***** Code for mail postage project *******/
​
app.get("/rate", (req, res) => {
  console.log("Request received for rate page");
  
​
  var weight = req.query.weight;
  var method = req.query.method;
​
  var price = calculateRate(req);
​
  var params = {Weight: weight, Method: method, Price: price};
  //res.write("This is the postal rate page");
  res.render("pages/postagePrice", params);
 
});
​
​
function calculateRate(req) {
  var weight = req.query.weight;
  var method = req.query.method;
​
  /*** Letters Stamped Prices ***/
  if(method == "Letters (Stamped)"){
    if (weight <= 1) {
      var price = "$" + 0.55;
  
    }
    if (weight > 1 && weight <= 2) {
      var price = "$" + 0.75;
  
    }
    if (weight >2 && weight <= 3) {
      var price = "$" + 0.95;
  
    }
    if (weight >3 && weight <= 3.5) {
      var price = "$" + 1.15;
  
    }
    
  }
​
  /*** Letters Metered Prices ***/
  if(method == "Letters (Metered)"){
    if (weight <= 1) {
      var price = "$" + 0.51;
  
    }
    if (weight > 1 && weight <= 2) {
      var price = "$" + 0.71;
  
    }
    if (weight >2 && weight <= 3) {
      var price = "$" + 0.91;
  
    }
    if (weight >3 && weight <= 3.5) {
      var price = "$" + 1.11;
  
    }
    
  }
​
  /*** Large Envelopes Prices ***/
  if(method == "Large Envelopes (Flats)"){
    if (weight <= 1) {
      var price = "$" + (1.00).toFixed(2);
  
    }
    if (weight > 1 && weight <= 2) {
      var price = "$" + (1.20).toFixed(2);
  
    }
    if (weight >2 && weight <= 3) {
      var price = "$" + (1.40).toFixed(2);
  
    }
    if (weight >3 && weight <= 4) {
      var price = "$" + (1.60).toFixed(2);
  
    }
    if (weight >4 && weight <= 5) {
      var price = "$" + (1.80).toFixed(2);
  
    }
    if (weight >5 && weight <= 6) {
      var price = "$" + (2.00).toFixed(2);
  
    }
    if (weight >6 && weight <= 7) {
      var price = "$" + (2.20).toFixed(2);
  
    }
    if (weight >7 && weight <= 8) {
      var price = "$" + (2.40).toFixed(2);
  
    }
    if (weight >8 && weight <= 9) {
      var price = "$" + (2.60).toFixed(2);
  
    }
    if (weight >9 && weight <= 10) {
      var price = "$" + (2.80).toFixed(2);
  
    }
    if (weight >10 && weight <= 11) {
      var price = "$" + (3.00).toFixed(2);
  
    }
    if (weight >11 && weight <= 12) {
      var price = "$" + (3.20).toFixed(2);
  
    }
    if (weight >12 && weight <= 13) {
      var price = "$" + (3.40).toFixed(2);
  
    }
    
  }
​
​
  /*** First Class-Retail Prices ***/
  if(method == "First-Class Package Service - Retail"){
    if (weight <= 4) {
      var price = "$" + (4.00).toFixed(2);
  
    }
    if (weight > 4 && weight <= 8) {
      var price = "$" + (4.80).toFixed(2);
  
    }
    if (weight >8 && weight <= 12) {
      var price = "$" + (5.50).toFixed(2);
  
    }
    if (weight >12 && weight <= 13) {
      var price = "$" + (1.60).toFixed(2);
  
    }
    
  }
  
  console.log(weight);
  console.log(method);
  console.log(price);
  
    return price;
  
}
​
​
​
/*********Code for Team Assignment - Calculator ******/
app.get("/math", (req, res) => {
  var result = solveMath(req);
  res.render("pages/results", {
    answer: result
  });
});
​
app.get("/math_service", (req, res) => {
​
  res.writeHead(200, {
    "Content-Type": "application/json"
  })
  var result = solveMath(req);
  console.log(result);
  var json = JSON.stringify({
    "answer": result
  })
  console.log(`math service: ${json}`);
  res.end(json);
})
​
​
// async function () {
//   let response = await fetch('/math_service')
//   let responseJson = await response.json()
//   let fromServer = responseJson.myString
//   alert(fromServer)
// }
// app.get(fetch('/results')
//   .then(response => response.json())
//   .then(data => console.log(data));
​
​
//   componentWillMount: function(){
//     var fromServer = fetch('/results')
//     .then(function(response) {
//       return response.json()
//     })
//     .then(function(responseJson) {
​
//       return responseJson.myString
//     })
​
//     alert(fromServer);
​
//   },
​
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
​
​
// if a file is in the public it just renders automatically
​
// operand1, operation, operand2
​
function solveMath(req) {
  var operand1 = req.query.operand1;
  var operand2 = req.query.operand2;
  var operation = req.query.operation;
​
  if (operation == "+") {
    var result = +operand1 + +operand2;
​
  }
  if (operation == "-") {
    var result = +operand1 - +operand2;
​
  }
  if (operation == "*") {
    var result = +operand1 * +operand2;
​
  }
  if (operation == "/") {
    var result = +operand1 / +operand2;
​
  }
  console.log(operation);
  console.log(operand2);
  console.log(operand1);
  console.log(result);
  // res.render('/results', () => {
  //   answer: result 
  // })
  return result;
}