import React from 'react';

const ComparisonTable = ({ prodCharaData }) => {
  return (
    <div className="comparison-table">
      <table>
        <thead>
          <tr>
            <td>{prodCharaData.currentProductName}</td>
            <td></td>
            <td>{prodCharaData.relatedProductName}</td>
          </tr>
        </thead>
        {prodCharaData.charas.map((val, key) => {
          return (
            <tbody key={key}>
              <tr>
                <td>{val.currentProdVal}</td>
                <td>{val.chara}</td>
                <td>{val.relatedProdVal}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  );
};

export { ComparisonTable };
