import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Match = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.match.name}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.match.location}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.match.description}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.match.date}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.match.level}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.match._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteMatch(props.match._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function MatchList() {
  const [matches, setMatches] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getMatches() {
      const response = await fetch(`http://localhost:5050/match/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const matches = await response.json();
      setMatches(matches);
    }
    getMatches();
    return;
  }, [matches.length]);

  // This method will delete a record
  async function deleteMatch(id) {
    await fetch(`http://localhost:5050/match/${id}`, {
      method: "DELETE",
    });
    const newMatches = matches.filter((el) => el._id !== id);
    setMatches(newMatches);
  }

  // This method will map out the records on the table
  function MatchesList() {
    return matches.map((match) => {
      return (
        <Match
          match={match}
          deleteMatch={() => deleteMatch(match._id)}
          key={match._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Matches Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Location
                </th>

                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Description
                </th>
               
               
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Date
                </th>

                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Level
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {MatchList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}