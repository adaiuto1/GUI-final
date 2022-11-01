import PropertyResult from "./PropertyResult";
import { properties } from './Directory';
function SearchResults() {
    let p = properties[0];
    let sortedResults = [p, p, p];
    console.log(p.tags);
    return (
        <div>
            <h1>search results</h1>
            <div>
                <ol>
                    <li>
                        <PropertyResult property={p}></PropertyResult>
                    </li>
                    <li>
                        <PropertyResult property={p}></PropertyResult>
                    </li>
                    <li>
                        <PropertyResult property={p}></PropertyResult>
                    </li>
                </ol>
            </div>
        </div>
    )
}
export default SearchResults;