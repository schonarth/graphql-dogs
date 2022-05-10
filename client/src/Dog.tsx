import { useQuery } from "graphql-hooks";

interface iProps {
  id?: number | void;
  bredFor?: string;
  breedGroup?: string;
  name?: string;
  limit?: number;
}

type Props = iProps;

const imgStyle = {
  'minWidth': '10vh',
  'maxWidth': '30vw',
}

function Dogs(props: Props) {
  const DOGS_QUERY = `query Dogs($id: Int, $name: String, $bredFor: String, $breedGroup: String, $limit: Int) {
    dogs(id: $id, name: $name, bred_for: $bredFor, breed_group: $breedGroup, limit: $limit) {
      id
      name
      bred_for
      breed_group
      weight { metric }
      height { metric }
      image { url }
    }
  }`

  const { loading, error, data } = useQuery(DOGS_QUERY, {
    variables: filterEmptyProps(props)
  })

  if (loading) return <div className="alert alert-info">Loading...</div>
  if (error) {
    return <>Something bad happened</>
  }

  const dogs: DogType[] = data.dogs;

  return (
    <div className="table-responsive-sm">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Bred for</th>
            <th>Breed group</th>
          </tr>
        </thead>
        <tbody>

          {dogs.map(({ id, name, image, bred_for, breed_group }) => (
            <tr key={id?.toString()}>
              <td>{id?.toString()}</td>
              <td>
                <strong>
                  {name}
                </strong>
              </td>
              <td>
                <img src={image.url} style={imgStyle} alt={name} />
              </td>
              <td>
                {bred_for}
              </td>
              <td>
                <i>{breed_group}</i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Dogs;


interface DogType {
  bred_for: string
  breed_group: string
  height: Dimensions
  weight: Dimensions
  id: number | void
  image: Image
  life_span: string
  name: string
  origin: string
  reference_image_id: string
  temperament: string
}

interface Dimensions {
  imperial: string
  metric: string
}

interface Image {
  id: string
  width: Number
  height: Number
  url: string
}

function filterEmptyProps<Props>(props: Props) {
  const filteredProps: iProps = {};
  for (const [k, v] of Object.entries(props)) {
    // @ts-ignore <-- forces TS compiler to compile this as-is
    if (!!v) filteredProps[k] = v
  }
  return filteredProps;
}