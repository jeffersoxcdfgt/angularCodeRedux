const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/api/rules', (req, res, next)  => {

  console.log(req.headers.authorization)

  res.status(200).json([
   {
      "IdRule":"5d976d68927c0c06fd83c11c",
      "Priority":1,
      "Description":"regla de negocio 1",
      "SimpleRules":[
         {
            "CorrelationId":"fsds22",
            "Parameter":"walletId",
            "ComparisionOperatorName":"Mayor que",
            "Value":65
         },
         {
            "CorrelationId":"22fs",
            "Parameter":"correlationId",
            "ComparisionOperatorName":"Menor que",
            "Value":12
         },
         {
            "CorrelationId":"qwer",
            "Parameter":"correlationId",
            "ComparisionOperatorName":"Igual que",
            "Value":12
         }
      ],
      "ComposeRules":[
         {
            "SimpleRulesIds":[
               "fsds22",
               "22fs",
               "qwer"
            ],
            "LogicalOperatorName":[
               {
                  "RuleOne":"fsds22",
                  "RuleTwo":"22fs",
                  "Operator":"AND"
               },
               {
                  "RuleOne":"22fs",
                  "RuleTwo":"qwer",
                  "Operator":"AND"
               }
            ]
         }
      ],
      "CreatedDate":"21-04-2019",
      "UpdateDate":"",
      "DeleteDate":"",
      "UserRegister":"ADMINTUYA",
      "UserRemove":"",
      "UserUpdate":"",
      "IsDeleted":false
   },
   {
      "IdRule":"5d976e3c927c0c06fd83c11d",
      "Priority":2,
      "Description":"regla de negocio 2",
      "SimpleRules":[
         {
            "CorrelationId":"fsds223",
            "Parameter":"walletId",
            "ComparisionOperatorName":"Mayor que",
            "Value":89
         },
         {
            "CorrelationId":"22fs3",
            "Parameter":"correlationId",
            "ComparisionOperatorName":"Menor que",
            "Value":43
         },
         {
            "CorrelationId":"qwer",
            "Parameter":"correlationId",
            "ComparisionOperatorName":"Igual que",
            "Value":22
         }
      ],
      "ComposeRules":[
         {
            "SimpleRulesIds":[
               "fsds223",
               "22fs3",
               "qwer"
            ],
            "LogicalOperatorName":[
               {
                  "RuleOne":"fsds22",
                  "RuleTwo":"22fs",
                  "Operator":"AND"
               },
               {
                  "RuleOne":"22fs3",
                  "RuleTwo":"qwer",
                  "Operator":"AND"
               }
            ]
         }
      ],
      "CreatedDate":"21-04-2019",
      "UpdateDate":"",
      "DeleteDate":"",
      "UserRegister":"ADMINTUYA",
      "UserRemove":"",
      "UserUpdate":"",
      "IsDeleted":false
    }
 ]);
});


app.get('/api/all', (req, res, next)  => {
  res.status(200).json([
   {
      "id_Parametro": 457,
      "key": "URL_SELECT",
      "descripcion": "Esta url se utiliza, para traer todas las reglas creadas , My proxy 1",
      "value": "http://tuya-mdes-dllo.eastus2.cloudapp.azure.com/motordereglas/api/v1.0/rules",
      "tipo": "A",
      "activo": true,
      "aplicaciones": null
   },
   {
      "id_Parametro": 458,
      "key": "URL_OPERATION",
      "descripcion": "Esta url se utiliza, para realizar las operaciones del crud de reglas , My proxy 2",
      "value": "http://tuya-mdes-dllo.eastus2.cloudapp.azure.com/motordereglas/api/v1.0/rule",
      "tipo": "A",
      "activo": true,
      "aplicaciones": null
    }  
   
 ]);
});


app.get('/ping', (req, res, next)  => {
  res.status(200).json('pong!');
});

app.post('/register', (req, res, next)  => {
  if (req.body.email === 'test@test.com') {
    res.status(201).json({
      status: 'success',
      token: '1234567'
    });
  } else {
    res.status(400).json({
      status: 'error'
    });
  }
});

app.post('/login', (req, res, next) => {
  if (req.body.email === 'test@test.com') {
    res.status(200).json({
      status: 'success',
      newtokenproxy: '1234567'
    });
  } else {
    res.status(400).json({
      status: 'error'
    });
  }
});

app.get('/status', (req, res, next)  => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'error'
    });
  }
  // simulate token decoding
  const header = req.headers.authorization.split(' ');
  const token = header[1];
  if (token === '1234567') {
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(401).json({
      status: 'error'
    });
  }
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: 'error',
    error: err
  });
});

app.listen(1337, () => {
  console.log('App listening on port 1337!');
});
