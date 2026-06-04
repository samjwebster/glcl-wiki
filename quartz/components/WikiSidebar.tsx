import {
    QuartzComponent,
    QuartzComponentConstructor,
    QuartzComponentProps,
} from "./types"
 
interface Options {
    photoUrl?: string
    infoRows?: object[]
}
 
const defaultOptions: Options = {
  photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/960px-President_Barack_Obama.jpg",
  infoRows: [["Name", "Barack Obama"], ["Born", "August 4, 1961"]],
}
 
const WikiSidebar: QuartzComponentConstructor<Options> = (userOpts?: Options) => {
  const opts = { ...defaultOptions, ...userOpts }
 
  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    if (opts.infoRows.length <= 0) return null
    return (
      <div>
        {opts.photoUrl && <img src={opts.photoUrl} alt="Profile" />}
        <ul>
          {opts.infoRows.map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    )
  }
 
  return Component
}
 
export default WikiSidebar