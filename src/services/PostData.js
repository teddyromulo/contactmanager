export function PostData(type, customerData) {
    let BaseURL = 'http://restful.lexibook.com/react101/api/';
    //let BaseURL = 'https://aftersales.ext.lexibook.com/customers/api/';

    return new Promise((resolve, reject) =>{
    
         
        fetch(BaseURL+type, {
            method: 'POST',
            body: JSON.stringify(customerData)
          })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });

  
      });
}