export async function getStaticProps(countryCode:any): Promise<any> {
    const response = await fetch('https://countries.trevorblades.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query($countryCode: ID!) { 
              country(code: $countryCode) {
              name
              native
              capital
              emoji
              currency
              languages {
                  code
                  name
              }
              }
          }
        `,
        variables: {
          countryCode: countryCode,
        },
      }),
    });
    const result = await response.json();
    return result;
  }



  export async function getAllCountry(countrySelect:any): Promise<any> {
    const response = await fetch('https://countries.trevorblades.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query ($countrySelect: ID!) {
  
            country(code: $countrySelect) {
                name
                native
                capital
                emoji
                currency
                languages {
                    code
                    name
                }
                  continent {
                    name
                    countries {
                      native
                      name
                      currency
                      phone
                      
                    }
                  }
                }
          }
        `, 
        variables: {
            countrySelect: countrySelect,
          },
      }),
    });
    const result = await response.json();
    return result;
  }