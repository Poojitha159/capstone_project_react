// // DynamicTable.js
// import React from 'react';
// import PropTypes from 'prop-types';
// import './DynamicTable.css'; // Optional: Add any specific styles for your table


// const DynamicTable = ({ data, columns, actions }) => {
//     return (
//         <table border="5" className="table table-striped">
//             <thead>
//                 <tr>
//                     {columns.map((col, index) => (
//                         <th key={index}>{col.title}</th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((item, index) => (
//                     <tr key={index}>
//                         {columns.map((col, colIndex) => (
//                             <td key={colIndex}>
//                                 {item[col.key] !== undefined ? item[col.key].toString() : 'N/A'}
//                             </td>
//                         ))}
//                         {actions && (
//                             <td>
//                                 {actions(item)}
//                             </td>
//                         )}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// DynamicTable.propTypes = {
//     data: PropTypes.array.isRequired,
//     columns: PropTypes.arrayOf(PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         key: PropTypes.string.isRequired
//     })).isRequired,
//     actions: PropTypes.func
// };

// export default DynamicTable;


// nul values and undefined 
import React from 'react';
import PropTypes from 'prop-types';
import './DynamicTable.css'; // Optional: Add any specific styles for your table

const DynamicTable = ({ data, columns, actions }) => {
    return (
        <table border="5" className="table table-striped">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.title}</th>
                    ))}
                    {actions && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={index}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {item[col.key] !== null && item[col.key] !== undefined ? item[col.key].toString() : 'N/A'}
                                </td>
                            ))}
                            {actions && (
                                <td>
                                    {actions(item)}
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + (actions ? 1 : 0)}>No data found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

DynamicTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
    })).isRequired,
    actions: PropTypes.func
};

export default DynamicTable;
