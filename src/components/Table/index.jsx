import './index.less';
/**
 * @author EliasLee
 *
 * @功能 table组件，适用大屏查询，做样式修改
 *
 * 1. 支持表头固定，tbody滚动，可隐藏滚动条
 * 2. 设置表头样式
 * 3. 设置不同行样式
 * 4. 设置每列宽度
 *
 * @param {Array} columns
 * @param {Array} datasource
 */
function Table({ columns, datasource }) {
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
