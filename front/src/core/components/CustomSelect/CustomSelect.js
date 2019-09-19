// import React from 'react';
//
// import Select from 'react-select';
// import 'react-select/dist/react-select.min.css';
// import './CustomSelect.scss';
//
// const defaultProps = {
//     options: [],
//     value: null,
//     name: '',
//     placeholder: 'Выбор',
//     multi: false,
//     onChange: () => {}
// };
//
// class CustomSelect extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             isFocused: false
//         }
//     }
//
//     setFocused = (focused) => {
//         this.setState({isFocused: focused});
//     };
//
//     onChange = (value) => {
//         let item = {};
//         item.value = value || value === 0 ? value : null;
//         item.name = this.props.name;
//
//         this.props.onChange(item);
//     };
//
//     render() {
//         return (
//             <div onFocusCapture={() => this.setFocused(true)} onBlurCapture={() => this.setFocused(false)}
//                  className={"custom-react-select"}>
//                 <Select
//                     className={"custom-react-select " + (this.isFocused ? 'focused' : '')}
//                     value={this.props.value}
//                     onChange={this.onChange}
//                     isFocused={this.isFocused}
//                     name={this.props.name}
//                     options={this.props.options}
//                     placeholder={this.props.placeholder}
//                     disabled={this.props.isDisabled}
//                     noResultsText='Ничего не найдено'
//                     multi={this.props.multi}
//                     simpleValue
//                     styles={{}}
//                 />
//             </div>
//         )
//     }
// }
//
// CustomSelect.defaultProps = defaultProps;
//
// export default CustomSelect;import CustomSelect from "../../components/CustomSelect/CustomSelect";

