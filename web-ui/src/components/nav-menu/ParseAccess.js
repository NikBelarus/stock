import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class ParseAccess extends Component {
    render() {
        const RoleAccess = {
            "GUEST": [
                {
                    "title": "Authorization",
                    "url": "/login"
                }
            ],
            "SYSTEM_ADMIN": [
                {
                    "title": "Companies",
                    "url": "/companies"
                },
                {
                    "title": "New Company",
                    "url": "/companies/new"
                },
                {
                    "title": "Finances",
                    "url": "/finances"
                },
                {
                    "title": "About",
                    "url": "/about"
                },
                {
                    "title": "My Profile",
                    "url": "/userInfo"
                }
            ],
            "STOCK_OWNER": [
                {
                    "title": "Consignments",
                    "url": "/consignments"
                },
                {
                    "title": "Carriers",
                    "url": "/carriers"
                },
                {
                    "title": "Inconsistency acts",
                    "url": "/inconsistencies"
                },
                {
                    "title": "Cancellation acts",
                    "url": "/cancellations"
                },
                {
                    "title": "Company stocks",
                    "url": "/stocks"
                },
                {
                    "title": "Stock workers",
                    "url": "/users"
                },
                {
                    "title": "Report",
                    "url": "/companies/stocks/reports/new"
                },
                {
                    "title": "Payment",
                    "url": "/pay"
                },
                {
                    "title": "My Profile",
                    "url": "/userInfo"
                },
                {
                    "title" : "About",
                    "url" : "/about"
                }
            ],
            "STOCK_ADMIN": [
                {
                    "title": "Company stocks",
                    "url": "/stocks"
                },
                {
                    "title": "Stock workers",
                    "url": "/users"
                },
                {
                    "title" : "About",
                    "url" : "/about"
                }
            ],
            "STOCK_DISPATCHER": [
                {
                    "title": "New input consignment",
                    "url": "/input_consignment/new"
                },
                {
                    "title": "Checked output consignments",
                    "url": "/verified__output_consignments"
                },
                {
                    "title": "My Profile",
                    "url": "/userInfo"
                },
                {
                    "title" : "About",
                    "url" : "/about"
                }
            ],
            "STOCK_MANAGER": [
                {
                    "title": "Checked input consignments",
                    "url": "/verified__input_consignments"
                },
                {
                    "title": "New output consignment",
                    "url": "/output_consignment/new"
                },
                {
                    "title" : "About",
                    "url" : "/about"
                }
            ],
            "CONTROLLER": [
                {
                    "title": "Registered input consignments",
                    "url": "/registered__input_consignments"
                },
                {
                    "title": "Registered output consignment",
                    "url": "/registered_output_consignment"
                },
                {
                    "title": "My Profile",
                    "url": "/userInfo"
                },
                {
                    "title" : "About",
                    "url" : "/about"
                }
            ]
        };
        const role = RoleAccess[this.props.user.role];
        let list =
            <ul id="menu-list">
                {role.map(item => (<li><Link style={{ color: 'white' }} to={item.url}>{item.title}</Link></li>))}
            </ul>;
        return (list);
    }
}
