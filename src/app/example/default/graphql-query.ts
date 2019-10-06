import gql from 'graphql-tag';

export interface QueryResult {
  pokemon?: [
    {
      name: string
    }
  ];
}

export const query = gql`
{
  pokemon(name: "Pikachu") {
    id
    number
    name
    attacks {
      special {
        name
        type
        damage
      }
    }
    evolutions {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      attacks {
        fast {
          name
          type
          damage
        }
      }
    }
  }
}
`;
