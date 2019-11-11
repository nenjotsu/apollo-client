// import React from 'react';
// import PropTypes from 'prop-types';
// import Card from 'antd/lib/card';
// import Row from 'antd/lib/row';
// import Col from 'antd/lib/col';
// import ProfileCompletion from './ProfileCompletion';

// const propTypes = {
//   children: PropTypes.array.isRequired,
// };

// class ProfileLayout extends React.Component {
//   shouldComponentUpdate(nextProps) {
//     const { children } = this.props;
//     return nextProps.children !== children;
//   }

//   render() {
//     return (
//       <main>
//         <Row className="profile-layout">
//           <Col>
//             <Row type="flex" justify="center" gutter={16} className="profile-layout-row">
//               <Col xs={{ span: 24 }} sm={{ span: 20 }} md={{ span: 6 }} lg={{ span: 6 }}>
//                 <ProfileCompletion />
//               </Col>
//               <Col xs={{ span: 24 }} sm={{ span: 20 }} md={{ span: 18 }} lg={{ span: 18 }}>
//                 <Card className="card-navigation">{this.props.children}</Card>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </main>
//     );
//   }
// }

// ProfileLayout.propTypes = propTypes;
// export default ProfileLayout;
