import React from "react";

const DetailLink = ({ links }) => {
  return (
    <>
      <ul>
        {links?.map((link) => (
          <li key={link.url}>
            <p>
              {link.type}
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DetailLink;
