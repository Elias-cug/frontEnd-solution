import './index.less';

function Map({ columns, datasource }) {
  const ths = (
    <tr>
      {columns.map((item, i) => {
        return (
          <th key={i} style={{ width: item.width }}>
            {item.title}
          </th>
        );
      })}
    </tr>
  );

  const rows = datasource.map((item, index) => {
    return (
      <tr key={index}>
        {columns.map((k, i) => {
          const data = item[k.dataIndex];
          const Cell = k.render !== undefined ? k.render(item) : data;
          return <td key={`${data}${i}`}>{Cell}</td>;
        })}
      </tr>
    );
  });

  return (
    <div className="custom-table-wrap">
      <table className="custom-table">
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default Table;
