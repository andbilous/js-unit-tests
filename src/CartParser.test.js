import CartParser from './CartParser';


beforeEach(() => {
  const  parser = new CartParser();
  const  parse = parser.parse.bind(parser);
  const  validate = parser.validate.bind(parser);
  const  parseLine = parser.parseLine.bind(parser);
  const calcTotal=parser.calcTotal;:
    break;
});

describe("CartParser - unit tests", () => {

    describe("basic positive test", ()=>{


      it('Should accept correct format of query', ()=>{
        const request= {
            "id": !null,
            "name": "Product1",
            "price": 22,
            "quantity": 2
        }
        let query ={
          name:"Product1",
          price: 22,
          quantity: 2
        };
        expect(validate(query).toEqual[request]);
      });
});


describe("Headers validation and cells quantity tests", ()=>{

      it('NonFormat Header in query test', () => {
            let errorRequest = {
                "column": 2,
                "message": "Expected header to be named \"Quantity\" but received undefined.",
                "row": 0,
                "type": "header",
            };
            let nonFormatHeader = '/weg/241/ss';

            expect(validate(nonFormatHeader)).toEqual([errorRequest]);
        });


          it('Should return error if cells are less than expected', () => {
            let errorRequest = 'Product name,Price,Quantity\n' +
                'item,5';
           let errorResponse = {
               "column": -1,
               "message": "Expected row to have 3 cells but received 2.",
               "row": 1,
               "type": "row",
           };

           expect(validate(errorRequest)).toEqual([errorResponse]);
       });


       it('Should return error when cell is empty', () => {
         let errorRequest = 'Product name,Price,Quantity\n' +
             'item,5';
        let errorResponse = {
            "column": -1,
            "message": "Expected row to have 3 cells but received 2.",
            "row": 1,
            "type": "row",
        };

        expect(validate(errorRequest)).toEqual([errorResponse]);
    });

});
describe("Headers validation and cells quantity tests", ()=>{

    it('Should return csv file parsing errors ', () => {
               let errorData =
               'Product name,Price\n' +
                   'item,1\n' +
                   'item,2,-5\n' +
                   ',3,3';
               let errorRequest = [
                 {
                     "column": 0,
                     "message": "Expected cell to be a nonempty string but received \"\".",
                     "row": 3,
                     "type": "cell",
                 },
                   {
                       "column": 2,
                       "message": "Expected header to be named \"Quantity\" but received undefined.",
                       "row": 0,
                       "type": "header",
                   },
                   {
                       "column": 2,
                       "message": "Expected cell to be a positive number but received \"-1\".",
                       "row": 2,
                       "type": "cell",
                   },
                   {
                       "column": -1,
                       "message": "Expected row to have 3 cells but received 2.",
                       "row": 1,
                       "type": "row",
                   }

               ];
               expect(validate(errorData)).toEqual(errorRequest);
           });
    });
describe("Cells value rounding and calculation", ()=>{


    it("Price rounding test", () => {
               const request = 'item,5.220,1';
               expect(parseLine(request).price).toEqual(5.22);
           });

    it("Should return correct total price of all items", () => {

                      const data = [
                          {
                              name: 'product1',
                              price: 5,
                              amount: 5
                          },
                          {
                              name: 'product2',
                              price: 5,
                              amount: 6
                          }
                      ];
                      const parsedItem1 = parseLine(`data,${data[0].price},${data[0].amount}`);
                      const parsedItem2 = parseLine(`data,${data[1].price},${data[1].amount}`);

                      const sum = 21;
                      const result = calcTotal([parsedItem1, parsedItem2]);

                      expect(result).toBe(sum);
                  })


   });
});

describe("CartParser - integration tests", () => {
  it('Return errors from file', () => {
    expect(()=>parse('./samples/test.csv')).toThrow();
});

});
