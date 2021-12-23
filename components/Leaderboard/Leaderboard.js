import React from "react";
import DataTable from "react-data-table-component";
import Button from "../atoms/Button";
import { useRouter } from "next/router";

// A super simple expandable component.{JSON.stringify(data, null, 2)}
const ExpandedComponent = ({ data }) => {
  const router = useRouter();
  const links = data?.helpfulLinks ?? [];
  return (
    <div className="p-6 top-border row-child">
      <div className="flex-row md:flex gap-x-12 mb-2">
        <div className="basis-1/3">
          <dl>
            <dt className="font-semibold">Pitch us your project in a tweet</dt>
            <dd className="mb-5">{data.projectTweet || "N.A."}</dd>
          </dl>
        </div>
        <div className="basis-2/3">
          <dl>
            <dt className="font-semibold">Background of each founder</dt>
            <dd className="mb-5">{data.founderBackground || "N.A"}</dd>
          </dl>
        </div>
      </div>
      <div className="md:flex gap-x-12 mb-2">
        <div className="basis-1/3 mb-5 md:mb-2">
          {links && (
            <ul>
              {links.map((link, i) => (
                <li key={`link-${i}`}>
                  <a href={link.trim()} target="_blank" rel="noreferrer">
                    {link.trim()}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="basis-2/3">
          <Button
            responsive="true"
            color="primary-outline"
            onClick={() => router.push({ pathname: "/dao-race/[id]", query: { id: data._id } })}
          >
            View Full Application
          </Button>
        </div>
      </div>
    </div>
  );
};

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  table: {
    style: {
      color: "white",
      marginTop: "3.5rem",
      marginBottom: "0.95rem",
    },
  },
  headRow: {
    style: {
      minHeight: "72px",
      background: "#00000005",
      border: "0 !important",
      borderRadius: "0.5rem",
      width: "calc(100% - 25px)",
      margin: "0.45rem 0.75rem",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      color: "#6b7280",
      fontWeight: "bold",
      fontSize: "1rem",
    },
  },
  rows: {
    style: {
      minHeight: "72px",
      background: "#FFFFFF",
      border: "0 !important",
      boxShadow: "rgb(149 157 165 / 20%) 0px 8px 24px",
      position: "relative",
      width: "calc(100% - 25px)",
      margin: "0.45rem 0.75rem",
      borderRadius: "0.5rem",
      fontWeight: "bold",
    },
  },

  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      color: "#000000",
      fontSize: "1rem",
    },
  },
};

const columns = [
  {
    id: "colRank",
    name: "Rank",
    selector: (row) => row.rank,
  },
  {
    id: "colLdVotes",
    name: "Votes",
    selector: (row) => (
      <div className="vote-action flex flex-row rounded-lg">
        {/* <label
        className="vote-badge"
        style={{
          background:
            "linear-gradient(90deg,rgba(228, 241, 252, 100%) 0%,rgba(218, 223, 252, 100%) 35%,rgba(236, 229, 249, 100%) 100%)",
        }}
      >
        {row.voteCount}
      </label> */}
        <div
          className="flex rounded-l-lg py-2 px-4"
          style={{
            background:
              "linear-gradient(90deg,rgba(228, 241, 252, 100%) 0%,rgba(218, 223, 252, 100%) 35%,rgba(236, 229, 249, 100%) 100%)",
          }}
        >
          <label className="font-semibold font-bold ">{row.voteCount}</label>
        </div>
        <button
          className="rounded-r-lg  hover:text-indigo-500 p-2"
          style={{
            background:
              "linear-gradient(90deg,rgba(228, 241, 252, 100%) 0%,rgba(218, 223, 252, 100%) 35%,rgba(236, 229, 249, 100%) 100%)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3M12 3L5 10M12 3L19 10" stroke="currentColor" strokeWidth="2"></path>
          </svg>
        </button>
      </div>
    ),
  },
  {
    id: "colName",
    name: "Name",
    selector: (row) => row.projectName ?? placeholderDiv,
  },
  {
    id: "colSdVotes",
    name: "Votes",
    selector: (row) => (
      <div className="vote-action flex flex-row rounded-lg">
        <div
          className="flex rounded-l-lg py-2 px-4"
          style={{
            background:
              "linear-gradient(90deg,rgba(228, 241, 252, 100%) 0%,rgba(218, 223, 252, 100%) 35%,rgba(236, 229, 249, 100%) 100%)",
          }}
        >
          <label className="font-semibold font-bold ">{row.voteCount}</label>
        </div>
        <button
          className="rounded-r-lg  hover:text-indigo-500 p-2"
          style={{
            background:
              "linear-gradient(90deg,rgba(228, 241, 252, 100%) 0%,rgba(218, 223, 252, 100%) 35%,rgba(236, 229, 249, 100%) 100%)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3M12 3L5 10M12 3L19 10" stroke="currentColor" strokeWidth="2"></path>
          </svg>
        </button>
      </div>
    ),
  },
  {
    id: "colSubmittedBy",
    name: "Submitted by",
    hide: "md",
    selector: (row) => row.discordId ?? row.userName ?? placeholderDiv,
  },
  // {
  //   name: "Date submitted",
  //   selector: (row) => row.submittedAt,
  // },
];

const placeholderDiv = (
  <div
    className="h-3 w-3/5 animate-pulse"
    style={{
      background: "linear-gradient(90deg, #E5E5E5 0%, rgba(255,255,255,1) 100%)",
    }}
  ></div>
);

const Leaderboard = ({ data, numRows }) => {
  let rows = JSON.parse(JSON.stringify(data));
  if (numRows) {
    rows = rows.slice(0, numRows);
  }
  return (
    <div className="leaderboard-list">
      <div className="dtable">
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={rows}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
