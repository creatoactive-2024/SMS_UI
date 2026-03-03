import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import applogo from "../components/img/l3.jpeg";
import applogo2 from "../components/img/l3.jpeg";


import { Outlet, useLocation } from "react-router-dom";
import {
  AiFillDashboard,
  AiOutlineBulb ,
  AiOutlineUsergroupAdd,
  AiOutlineDollar,
  AiOutlineBank ,
  AiOutlineSafetyCertificate,
  AiOutlineBarChart ,
  AiOutlineInsurance,
  AiOutlineControl,
  AiOutlineFundProjectionScreen,
  AiOutlineBook,
  AiOutlineDollarCircle,
  AiOutlineQuestionCircle,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineBars,
  AiOutlineGlobal,
  AiOutlineAppstore,
  AiOutlineSchedule,
  AiOutlineDatabase,
  AiOutlineUserAdd,
  AiOutlineLogout,
  AiOutlineSwap ,
  AiOutlineLineChart,
  
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { auth } from '../auth/firebaseConfig';  // Import your Firebase auth instance


import { Layout, Menu, theme } from "antd";
import "./commonsidebar.css";

const { Header, Sider, Content } = Layout;

const CommonSidebar = () => {
  // const [collapsed, setCollapsed] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);


  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showVerticalSlider, setShowVerticalSlider] = useState(false);
  const [selectedKey, setSelectedKey] = useState(localStorage.getItem('selectedMenuKey') || "");


  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    // Function to handle window resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set the breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    // Check if the selectedKey is the current path
    const savedKey = localStorage.getItem('selectedMenuKey');
    if (savedKey && location.pathname !== `/${savedKey}`) {
      navigate(savedKey);
    }
  }, [navigate, location.pathname]);



  const handleLogout = async () => {
    try {
      // Sign out the user using Firebase auth
      await auth.signOut();

      localStorage.removeItem('selectedMenuKey');


      // Navigate to the login page
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };


  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    } else {
      navigate(key);
      setSelectedKey(key);
      localStorage.setItem('selectedMenuKey', key);
    }
  };

  const toggleVerticalSlider = () => {
    setShowVerticalSlider(!showVerticalSlider);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="Sidebar w-1"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "white" }}
        width={300}
      >
       <div className="logo" style={{ backgroundColor: "white", display: "flex", justifyContent: "center" }}>
  <h2 className="text-white fs-5 text-center py-3 mb-0  d-flex justify-center">
    {!collapsed ? (
      <span className="sm-logo">
        <img src={applogo} alt="Small App Logo" style={{ width: 130 }} />
      </span>
    ) : (
      <span className="lg-logo">
        <img src={applogo} alt="Big App Logo" style={{ width: 70 }} />
      </span>
    )}
  </h2>
</div>


<div className="sidebar-wrapper" style={{ overflowY: "auto", height: "calc(100vh - 64px)" }}>
        <div className="sidebar-menu">
          <Menu
            theme="light"
            mode="inline"
            // defaultSelectedKeys={[""]}
            // onClick={({ key }) => {
            //   if (key === "logout") {
            //     handleLogout();
            //   } else {
            //     navigate(key);
            //   }
            // }}
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={[

                // {
                //   key: "",
                //   icon: <AiFillDashboard />,
                //   label: "Dashboard",
                // },
                // {
                //   key: "",
                //   icon: <AiOutlineQuestionCircle />,
                //   label: "Enquiries",
                // },
                {
                  key: "enquiriescopy",
                  icon: <AiOutlineQuestionCircle />,
                  label: "Enquiries 2.0",
                },
                // {
                //   key: "bookings",
                //   icon: <AiOutlineBook />,
                //   label: "Bookings",
                // },
 {
                  key: "dashboard",
                  icon: <AiOutlineQuestionCircle />,
                  label: "Dashboard",
                },

//  {
//                   key: "bookings_all",
//                   icon: <AiOutlineBook  />,
//                   label: "Bookings",
//                   children: [
//                     {
//                       key: "bookings",
//                       icon: <AiOutlineUsergroupAdd />,
//                       label: "Confirmed bookings",
//                     },
//                     {
//                       key: "bookings_to_be_classed",
//                       icon: <AiOutlineSchedule  />,
//                       label: "Bookings to be classed",
//                     },
//                     {
//                       key: "provisional_bookings",
//                       icon: <AiOutlineDatabase />,
//                       label: "Provisional bookings",
//                     },
                    
//                   ]
//                   },

/* booking 2.0 */

 {
                  key: "bookings_all1",
                  icon: <AiOutlineBook  />,
                  label: "Bookings 2.0",
                  children: [
                    {
                      key: "bookingscopy",
                      icon: <AiOutlineUsergroupAdd />,
                      label: "Confirmed bookings",
                    },
                    {
                      key: "bookings_to_be_classed",
                      icon: <AiOutlineSchedule  />,
                      label: "Bookings to be classed",
                    },
                    {
                      key: "provisional_bookings",
                      icon: <AiOutlineDatabase />,
                      label: "Provisional bookings",
                    },
                    
                  ]
                  },
/* booking 2.0 end */





                // {
                //   key: "students",
                //   icon: <AiOutlineUser  />,
                //   label: "Students",
                //   children: [
                //     {
                //       key: "studentView",
                //       icon: <AiOutlineUsergroupAdd />,
                //       label: "Student View",
                //     },
                //     {
                //       key: "arrivaList",
                //       icon: <AiOutlineSchedule  />,
                //       label: "Arrival List",
                //     },
                //     {
                //       key: "checkedInstdents",
                //       icon: <AiOutlineDatabase />,
                //       label: "Checked In Students",
                //     },
                //     {
                //       key: "depatureList",
                //       icon: <AiOutlineDatabase />,
                //       label: "Departure List",
                //     },
                //     {
                //       key: "feedbackList",
                //       icon: <AiOutlineDatabase />,
                //       label: "Feedback List",
                //     },
                //     {
                //       key: "visaList",
                //       icon: <AiOutlineDatabase />,
                //       label: "Visa List",
                //     },
                //     {
                //       key: "sponsoredStudents",
                //       icon: <AiOutlineDatabase />,
                //       label: "Sponsored Students",
                //     },
                //   ]
                //   },




                {
                  key: "classScheduling",
                  icon: <AiOutlineSchedule />,
                  label: "Time Table & Classes",
                  children: [
                    {
                      key: "schedule_class",
                      icon: <AiOutlineDatabase />,
                      label: "Time Table & Classes",
                      children:[
                      //   {
                      //     key: "scheduling",
                      // icon: <AiOutlineBook />,
                      // label: "Time Table",
                      //   },
                      //   {
                      //     key: "classes",
                      // icon: <AiOutlineBook />,
                      // label: "Class List",
                      //   },
                        {
                          key: "schedulingreplica",
                      icon: <AiOutlineBook />,
                      label: "Time Table 2.0",
                        },
                        {
                          key: "classesnew",
                      icon: <AiOutlineBook />,
                      label: "Class List 2.0",
                        },
                       
                      ]
                    },
                    {
                      key: "teacher_management",
                      icon: <AiOutlineDatabase />,
                      label: "Teacher Management",
                      children:[
                        {
                          key: "teacher",
                      icon: <AiOutlineBook />,
                      label: "Teacher",
                        },
                       
                      ]
                    },
                    {
                      key: "resources",
                      icon: <AiOutlineDatabase />,
                      label: "Resources",
                      children:[
                        {
                          key: "courses",
                      icon: <AiOutlineBook />,
                      label: "Courses",
                        },
                        {
                          key: "courses_categories",
                      icon: <AiOutlineAppstore />,
                      label: "Courses Categories",
                        },
                        {
                          key: "levels",
                      icon: <AiOutlineBars />,
                      label: "Levels",
                        },
                        {
                          key: "course_languages",
                      icon: <AiOutlineGlobal />,
                      label: "Course Languages",
                        },
                        {
                          key: "classrooms",
                      icon: <AiOutlineHome />,
                      label: "Classrooms",
                        },
                        {
                          key: "buildings_floors",
                      icon: <AiOutlineHome />,
                      label: "Buildings & Floors",
                        },
                        {
                          key: "default_time",
                      icon: <AiOutlineHome />,
                      label: "Default Times (Scheduling)",
                        },
                        {
                          key: "color_codes",
                      icon: <AiOutlineHome />,
                      label: "Color Codes",
                        },
                      ]
                    },                   
                  ],
                },

                // {
                //   key: "prices",
                //   icon: <AiOutlineBook  />,
                //   label: "Course Prices",
                //   children: [
                //     {
                //       key: "seasons",
                //       icon: <AiOutlineDatabase />,
                //       label: "Seasons",
                //     },
                //     {
                //       key: "add_prices",
                //       icon: <AiOutlineSchedule  />,
                //       label: "Add Prices",
                //     },
              
                    
                //   ]
                //   },





                   {
                  key: "prices1",
                  icon: <AiOutlineBook  />,
                  label: "Course Prices",
                  children: [
                    {
                      key: "pricing_seasons",
                      icon: <AiOutlineDatabase />,
                      label: "Academic Seasons",
                    },
                    {
                      key: "base_price",
                      icon: <AiOutlineSchedule  />,
                      label: "Base Price",
                    },
              //  {
              //         key: "discount_price",
              //         icon: <AiOutlineSchedule  />,
              //         label: "Discount",
              //       },
              //       {
              //         key: "preview_price",
              //         icon: <AiOutlineSchedule  />,
              //         label: "Price Calculator",
              //       },
                  ]
                  },





                {
                  key: "transfermodule",
                  icon: <AiOutlineSwap />,
                  label: "Transfer",
                  children: [
                    // {
                    //   key: "transfer",
                    //   icon: <AiOutlineSwap  />,
                    //   label: "Transfer",
                    // },
                    {
                      key: "transferResources",
                      icon: <AiOutlineDatabase />,
                      label: "Resources",
                      children:[
                        {
                          key: "transferLocation",
                      icon: <AiOutlineGlobal />,
                      label: "Transfer Locations",
                        },
                        {
                          key: "transferProvider",
                      icon: <AiOutlineUsergroupAdd />,
                      label: "Provider",
                        },
                        {
                          key: "transferPricesCosts",
                      icon: <AiOutlineDollar />,
                      label: "Prices & Costs",
                        },
                      ]
                    },
                  ]
                },

                {
                  key: "insurancemodule",
                  icon: <AiOutlineInsurance  />,
                  label: "Insurance",
                  children: [
                    // {
                    //   key: "Student",
                    //   icon: <AiOutlineUser  />,
                    //   label: "Student",
                    // },
                    {
                      key: "insuranceResources",
                      icon: <AiOutlineDatabase />,
                      label: "Resources",
                      children:[
                        {
                          key: "insuranceProvider",
                      icon: <AiOutlineBook />,
                      label: "Provider",
                        },
                        {
                          key: "insurance",
                      icon: <AiOutlineAppstore />,
                      label: "Insurance",
                        },
                        {
                          key: "insuranceWeeks",
                      icon: <AiOutlineBars />,
                      label: "Weeks",
                        },
                      ]
                    },
                  ]
                },

                {
                  key: "activities",
                  icon: <AiOutlineControl  />,
                  label: "Social Activities",
                  children: [
                    // {
                    //   key: "activitiesScheduling",
                    //   icon: <AiOutlineUser  />,
                    //   label: "Scheduling",
                    // },
                    // {
                    //   key: "bookedActivities",
                    //   icon: <AiOutlineUser  />,
                    //   label: "Booked Activities",
                    // },
                    {
                      key: "activitiesResources",
                      icon: <AiOutlineDatabase />,
                      label: "Resources",
                      children:[
                        {
                          key: "activities",
                      icon: <AiOutlineAppstore />,
                      label: "Social Activities",
                        },
                        {
                          key: "activitiesProvider",
                      icon: <AiOutlineBook />,
                      label: "Provider",
                        },
                        
                       
                      ]
                    },
                  ]
                },


                {
                  key: "accounting",
                  icon: <AiOutlineDollarCircle  />,
                  label: "Accounting",
                  children: [
                    {
                      key: "invoice_overview",
                      icon: <AiOutlineUser  />,
                      label: "Invoice overview",
                      children:[
                        {
                          key: "document_overview",
                      icon: <AiOutlineAppstore />,
                      label: "Document overview",
                        },
                        {
                          key: "release_docs",
                      icon: <AiOutlineAppstore />,
                      label: "Release documents",
                        },
                        {
                          key: "booking_stack",
                      icon: <AiOutlineAppstore />,
                      label: "Booking stack",
                        },
                        {
                          key: "convert_proforma",
                      icon: <AiOutlineAppstore />,
                      label: "Convert proforma",
                        },
                        {
                          key: "partial_invoices",
                      icon: <AiOutlineAppstore />,
                      label: "Partial invoices",
                        },
                      ]
                    },
                    {
                      key: "incoming_payments",
                      icon: <AiOutlineUser  />,
                      label: "Incoming payments",
                      children:[
                        {
                          key: "client_payments",
                      icon: <AiOutlineAppstore />,
                      label: "Client payments",
                        },
                        {
                          key: "agent_payments",
                      icon: <AiOutlineAppstore />,
                      label: "Agent payments",
                        },
                        {
                          key: "incoming_payment",
                      icon: <AiOutlineAppstore />,
                      label: "Incoming payments",
                        },
                        {
                          key: "payment_details",
                      icon: <AiOutlineAppstore />,
                      label: "Payment details",
                        },
                        {
                          key: "account_receivable",
                      icon: <AiOutlineAppstore />,
                      label: "Accounts receivable",
                        },
                        {
                          key: "assign_payments",
                      icon: <AiOutlineAppstore />,
                      label: "Assign payments",
                        },
                        {
                          key: "aged_debtor_reports",
                      icon: <AiOutlineAppstore />,
                      label: "Aged debtor reports",
                        },
                      ]
                    },
                    {
                      key: "outgoing_payments",
                      icon: <AiOutlineUser  />,
                      label: "Outgoing payments",
                      children:[
                        {
                          key: "pay_commission",
                      icon: <AiOutlineAppstore />,
                      label: "Pay Commission",
                        },
                        {
                          key: "manual_credit_notes",
                      icon: <AiOutlineAppstore />,
                      label: "Manual credit notes",
                        },
                        {
                          key: "overpayments",
                      icon: <AiOutlineAppstore />,
                      label: "Overpayments",
                        },
                        {
                          key: "checks",
                      icon: <AiOutlineAppstore />,
                      label: "Checks",
                        },
                        
                      ]
                    },
                    {
                      key: "pay_provider",
                      icon: <AiOutlineUser  />,
                      label: "Pay provider",
                      children:[
                        {
                          key: "pay_teachers",
                      icon: <AiOutlineAppstore />,
                      label: "Pay teachers",
                        },
                        {
                          key: "paid_teachers",
                      icon: <AiOutlineAppstore />,
                      label: "Paid teachers",
                        },
                        {
                          key: "pay_accommodation_provider",
                      icon: <AiOutlineAppstore />,
                      label: "Pay accommodation provider",
                        },
                        {
                          key: "paid_accommodation",
                      icon: <AiOutlineAppstore />,
                      label: "Paid accommodation",
                        },
                        {
                          key: "pay_transfers",
                      icon: <AiOutlineAppstore />,
                      label: "Pay transfers",
                        },
                        {
                          key: "paid_transfers",
                      icon: <AiOutlineAppstore />,
                      label: "Paid transfers",
                        },
                      ]
                    },
                    {
                      key: "accountingResources",
                      icon: <AiOutlineDatabase />,
                      label: "Resources",
                      children:[
                        {
                          key: "companies",
                      icon: <AiOutlineAppstore />,
                      label: "Companies",
                        },
                        {
                          key: "taxRate",
                      icon: <AiOutlineBook />,
                      label: "Tax Rate",
                        },
                        {
                          key: "receipt_texts",
                      icon: <AiOutlineAppstore />,
                      label: "Templates for receipt texts",
                        },
                        {
                          key: "accountingPaymentMethod",
                      icon: <AiOutlineAppstore />,
                      label: "Payment Method",
                        },
                        {
                          key: "termsOfPayments",
                      icon: <AiOutlineAppstore />,
                      label: "Terms Of Payment",
                        },
                       
                      ]
                    },
                  ]
                },
                {
                  key: "marketing",
                  icon: <AiOutlineFundProjectionScreen  />,
                  label: "Marketing",
                  children: [
                    {
                      key: "agencies",
                      icon: <AiOutlineBank  />,
                      label: "Agencies",
                      children:[
                        {
                          key: "agency",
                      icon: <AiOutlineBank  />,
                      label: "Agencies",
                        },
                        {
                          key: "agency_employee",
                      icon: <AiOutlineBank  />,
                      label: "Agent employee",
                        },
                        {
                          key: "agent_category",
                      icon: <AiOutlineAppstore />,
                      label: "Agent Categories",
                        },
                        {
                          key: "agent_group",
                      icon: <AiOutlineBars />,
                      label: "Agent Group",
                        },
                        {
                          key: "commission_categories",
                      icon: <AiOutlineBarChart  />,
                      label: "Commission Categories",
                        },
                        {
                          key: "agent_list",
                      icon: <AiOutlineUsergroupAdd  />,
                      label: "Agent List",
                        },
                        
                      ]
                    },
                    {
                      key: "sponsors",
                      icon: <AiOutlineDatabase />,
                      label: "Sponsors",
                    },

                    {
                      key: "feedback",
                      icon: <AiOutlineDatabase />,
                      label: "Feedback",
                      children:[
                        {
                          key: "add_topic",
                      icon: <AiOutlineBook />,
                      label: "Add topics",
                        },
                        {
                          key: "add_question",
                      icon: <AiOutlineBook />,
                      label: "Add questions",
                        },
                        {
                          key: "add_scale",
                      icon: <AiOutlineBook />,
                      label: "Add scales",
                        },
                        {
                          key: "add_questionnaires",
                      icon: <AiOutlineBook />,
                      label: "Add questionnaires",
                        },
                                             
                      ]
                    },

                    {
                      key: "complaints",
                      icon: <AiOutlineDatabase />,
                      label: "Complaints",
                    },
                    {
                      key: "special",
                      icon: <AiOutlineDatabase />,
                      label: "Special",
                    },
                    {
                      key: "prices_costs",
                      icon: <AiOutlineDatabase />,
                      label: "Prices & Costs",
                      children:[
                      //   {
                      //     key: "price_general",
                      // icon: <AiOutlineBook />,
                      // label: "Prices-General",
                      //   },
                        {
                          key: "price_insurance",
                      icon: <AiOutlineBook />,
                      label: "Prices-Insurance",
                        },
                        {
                          key: "price_activities",
                      icon: <AiOutlineBook />,
                      label: "Prices-Activities",
                        },
                        {
                          key: "cost_general",
                      icon: <AiOutlineBook />,
                      label: "Costs-General",
                        },
                                             
                      ]
                    },
                    {
                      key: "marketing_resources",
                      icon: <AiOutlineDatabase />,
                      label: "Marketing Resources",
                      children:[
                        {
                          key: "how_did_you_here",
                      icon: <AiOutlineBook />,
                      label: "How did you here about us?",
                        },
                        {
                          key: "student_status",
                      icon: <AiOutlineBook />,
                      label: "Student Status",
                        },
                        {
                          key: "crm_subject",
                      icon: <AiOutlineBook />,
                      label: "CRM Subject",
                        },
                       {
                          key: "type_of_contact",
                      icon: <AiOutlineBook />,
                      label: "Type of Contact",
                        },
                        {
                          key: "complaint_category",
                      icon: <AiOutlineBook />,
                      label: "Complaint Categories",
                        },
                                             
                      ]
                    },

                    {
                      key: "resources_marketing",
                      icon: <AiOutlineDatabase />,
                      label: "Resources",
                      children:[
                        {
                          key: "reasons_manual_credit_notes",
                      icon: <AiOutlineBank  />,
                      label: "Reasons for manual credit notes",
                        },
                        {
                          key: "periods",
                      icon: <AiOutlineBank  />,
                      label: "Periods",
                        },
                        {
                          key: "public_holidays",
                      icon: <AiOutlineBank  />,
                      label: "Public holidays",
                        },
                      //   {
                      //     key: "school_holidays",
                      // icon: <AiOutlineBank  />,
                      // label: "School holidays",
                      //   },
                        {
                          key: "additional_fees",
                      icon: <AiOutlineBank  />,
                      label: "Additional fees",
                        },
                        {
                          key: "cancellation_fees",
                      icon: <AiOutlineBank  />,
                      label: "Cancellation fees",
                        },
                        {
                          key: "lesson_price",
                      icon: <AiOutlineBook />,
                      label: "Lessons (prices)",
                        },
                        {
                          key: "week_cost",
                      icon: <AiOutlineBook />,
                      label: "Weeks (Costs)",
                        },
                        {
                          key: "week_price",
                      icon: <AiOutlineBook />,
                      label: "Weeks (Prices)",
                        },
                       
                      ]
                    },
                
                    
                  ],
                },
                // {
                //   key: "reporting",
                //   icon: <AiOutlineLineChart  />,
                //   label: "Reporting",
                //   children: [
                //     {
                //       key: "overview",
                //       icon: <AiOutlineDatabase />,
                //       label: "Overview",
                //     },
                //     // {
                //     //   key: "overview_v2",
                //     //   icon: <AiOutlineDatabase />,
                //     //   label: "Overview v2",
                //     // },
                //     {
                //       key: "basic_reports1",
                //       icon: <AiOutlineDatabase />,
                //       label: "Basic reports 1",
                //     },
                //     {
                //       key: "quarterly_report",
                //       icon: <AiOutlineDatabase />,
                //       label: "Quarterly report",
                //     },
                //     {
                //       key: "mothertounge_per_inbox",
                //       icon: <AiOutlineDatabase />,
                //       label: "Mother tounge per inbox",
                //     },
                //     {
                //       key: "feedback_sums",
                //       icon: <AiOutlineDatabase />,
                //       label: "Feedback sums",
                //     },
                //     // {
                //     //   key: "student_week_per_agency",
                //     //   icon: <AiOutlineDatabase />,
                //     //   label: "Student weeks per agency/country",
                //     // },
                //     {
                //       key: "agent_revenue",
                //       icon: <AiOutlineDatabase />,
                //       label: "Agent revenues(payments)",
                //     },
                //     {
                //       key: "deferred_payments",
                //       icon: <AiOutlineDatabase />,
                //       label: "Deferred payments",
                //     },

                //     {
                //       key: "debtor_report",
                //       icon: <AiOutlineDatabase />,
                //       label: "Debtor report(services)",
                //     },
                //     {
                //       key: "quic_report",
                //       icon: <AiOutlineDatabase />,
                //       label: "QUIC report",
                //     },
                //     {
                //       key: "agency_report",
                //       icon: <AiOutlineDatabase />,
                //       label: "Agencies",
                //     },
                //     {
                //       key: "cancellations",
                //       icon: <AiOutlineDatabase />,
                //       label: "Cancellations?",
                //     },
                //     {
                //       key: "students_come_from",
                //       icon: <AiOutlineDatabase />,
                //       label: "Where did students come from",
                //     },


                //     {
                //       key: "reportingResources",
                //       icon: <AiOutlineDatabase />,
                //       label: "Resources",
                //       children:[
                //         {
                //           key: "reportPages",
                //       icon: <AiOutlineAppstore />,
                //       label: "Report Pages",
                //         },
                //         {
                //           key: "tailor_made_reports",
                //       icon: <AiOutlineAppstore />,
                //       label: "Tailor made reports",
                //         },
                //         {
                //           key: "statistic_v2",
                //       icon: <AiOutlineAppstore />,
                //       label: "Statistics v2",
                //         },
                //         {
                //           key: "age_group",
                //       icon: <AiOutlineBook />,
                //       label: "Age groups",
                //         },
                //         {
                //           key: "report_setting",
                //       icon: <AiOutlineAppstore />,
                //       label: "Settings",

                      
                //         },
                       
                //       ]
                //     },
                //   ]
                // },


                // {
                //   key: "Account Management",
                //   icon: <AiOutlineUser />,
                //   label: "Management",
                //   children: [
                //     {
                //       key: "createaccount",
                //       icon: <AiOutlineUserAdd />,
                //       label: "Data",
                //     },
                //   ],
                // },


                {
                  key: "admin",
                  icon: <AiOutlineUser />,
                  label: "Admin",
                  children: [
                    {
                      key: "employees",
                      icon: <AiOutlineUserAdd />,
                      label: "Employees",
                      children:[
                        {
                          key: "overview_admin",
                      icon: <AiOutlineAppstore />,
                      label: "Overview",
                        },
                        {
                          key: "user_group",
                      icon: <AiOutlineAppstore />,
                      label: "User groups",
                        },
                        {
                          key: "categories_admin",
                      icon: <AiOutlineAppstore />,
                      label: "Categories",
                        },
                      ]
                    },
                    {
                      key: "contact_admin",
                      icon: <AiOutlineUserAdd />,
                      label: "Contacts",
                    },
                    {
                      key: "template_admin",
                      icon: <AiOutlineUserAdd />,
                      label: "Templates",
                      children:[
                        {
                          key: "file_uploads",
                      icon: <AiOutlineAppstore />,
                      label: "File uploads",
                        },
                        {
                          key: "pdf_layouts",
                      icon: <AiOutlineAppstore />,
                      label: "PDF layouts",
                        },
                        {
                          key: "pdf_templates",
                      icon: <AiOutlineAppstore />,
                      label: "PDF templates",
                        },
                        {
                          key: "email_layout_html",
                      icon: <AiOutlineAppstore />,
                      label: "E-mail layout (HTML only)",
                        },
                        {
                          key: "email_layout_co-op",
                      icon: <AiOutlineAppstore />,
                      label: "E-mail layout 2 (co-op)",
                        },
                      //   {
                      //     key: "email_template",
                      // icon: <AiOutlineAppstore />,
                      // label: "E-mail templates",
                      //   },
                        {
                          key: "email_template2",
                      icon: <AiOutlineAppstore />,
                      label: "E-mail templates 2 (co-op)",
                        },
                        {
                          key: "sms_template",
                      icon: <AiOutlineAppstore />,
                      label: "SMS templates",
                        },
                        {
                          key: "app_template",
                      icon: <AiOutlineAppstore />,
                      label: "App templates",
                        },
                        {
                          key: "contract_type",
                      icon: <AiOutlineAppstore />,
                      label: "Contract types",
                        },
                      ]
                    },

                    {
                      key: "administration",
                      icon: <AiOutlineUserAdd />,
                      label: "Administration",
                      children:[
                        {
                          key: "schools",
                      icon: <AiOutlineAppstore />,
                      label: "Schools",
                        },
                        {
                          key: "inbox_list",
                      icon: <AiOutlineAppstore />,
                      label: "Inbox lists",
                        }, 
                        {
                          key: "number_range",
                      icon: <AiOutlineAppstore />,
                      label: "Number Range",
                        }, 
                        {
                          key: "system_update",
                      icon: <AiOutlineAppstore />,
                      label: "System Update",
                        },  
                        {
                          key: "general_setting",
                      icon: <AiOutlineAppstore />,
                      label: "General setting",
                        },  
                      //   {
                      //     key: "email_accounts",
                      // icon: <AiOutlineAppstore />,
                      // label: "E-mail accounts",
                      //   },    
                        {
                          key: "exchange_rates",
                      icon: <AiOutlineAppstore />,
                      label: "Exchange rates",
                        },   
                        {
                          key: "event_control",
                      icon: <AiOutlineAppstore />,
                      label: "Event control",
                        },     
                        {
                          key: "email_spool",
                      icon: <AiOutlineAppstore />,
                      label: "Email spool",
                        },                   
                      ]
                    },
                    {
                      key: "other_admin",
                      icon: <AiOutlineUserAdd />,
                      label: "Other",
                      children:[
                        {
                          key: "categories_for_absence",
                      icon: <AiOutlineAppstore />,
                      label: "Categories for absence",
                        },
                        {
                          key: "visa_type",
                      icon: <AiOutlineAppstore />,
                      label: "Visa types",
                        }, 
                        {
                          key: "fonts",
                      icon: <AiOutlineAppstore />,
                      label: "Fonts",
                        }, 
                        {
                          key: "invoice_position",
                      icon: <AiOutlineAppstore />,
                      label: "Invoice positions",
                        }, 
                        {
                          key: "point_of_sale",
                      icon: <AiOutlineAppstore />,
                      label: "Points of sale",
                        },  
                        {
                          key: "communication_category",
                      icon: <AiOutlineAppstore />,
                      label: "Communication categories",
                        },                    
                      ]
                    },
                    {
                      key: "fontend_admin",
                      icon: <AiOutlineUserAdd />,
                      label: "Frontend",
                      children:[
                        {
                          key: "online_form",
                      icon: <AiOutlineAppstore />,
                      label: "Online forms",
                        },
                        {
                          key: "frontend_translation",
                      icon: <AiOutlineAppstore />,
                      label: "Frontend translations",
                        }, 
                        {
                          key: "api_token",
                      icon: <AiOutlineAppstore />,
                      label: "API token",
                        }, 
                        {
                          key: "templates_frontend",
                      icon: <AiOutlineAppstore />,
                      label: "Templates",
                        }, 
                        {
                          key: "combinations",
                      icon: <AiOutlineAppstore />,
                      label: "Combinations",
                        },  
                        {
                          key: "App_content_frontend",
                      icon: <AiOutlineAppstore />,
                      label: "App content",
                        },    
                      //   {
                      //     key: "course_structure",
                      // icon: <AiOutlineAppstore />,
                      // label: "Course structure",
                      //   },    
                        {
                          key: "overarching_courses",
                      icon: <AiOutlineAppstore />,
                      label: "Overarching courses",
                        },                    
                      ]
                    },
                    {
                      key: "user_interface",
                      icon: <AiOutlineUserAdd />,
                      label: "User Interface",
                      children:[
                        {
                          key: "filter_sets",
                      icon: <AiOutlineAppstore />,
                      label: "Filter sets",
                        },
                        {
                          key: "custom_fields",
                      icon: <AiOutlineAppstore />,
                      label: "Custom fields",
                        }, 
                        {
                          key: "custom_upload_fields",
                      icon: <AiOutlineAppstore />,
                      label: "Custom upload fields",
                        }, 
                                
                      ]
                    },
                    {
                      key: "background_tasks",
                      icon: <AiOutlineUserAdd />,
                      label: "Background tasks",
                      children:[
                        {
                          key: "failed_background_task",
                      icon: <AiOutlineAppstore />,
                      label: "Failed background tasks",
                        },
                       
                      ]
                    },
                    {
                      key: "log",
                      icon: <AiOutlineUserAdd />,
                      label: "Log",
                      
                    },
                    {
                      key: "digital_screens",
                      icon: <AiOutlineUserAdd />,
                      label: "Digital screens",
                      
                    },
                  ],
                },

                {
                  key: "logout",
                  icon: <AiOutlineLogout />,
                  label: "Logout",
                },
              ]}
            />
          </div>
        </div>
      </Sider>
      <Layout className="site-layout">
  <Header
    className="d-flex justify-content-between align-items-center"
    style={{
      padding: "15px",
      backgroundColor: "#354869",
      position: "relative",
      color : "#fff",
    }}
  >
    {React.createElement(
        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: toggleMenu,
        }
      )}

{/* <MenuFoldOutlined className="trigger" /> */}
    <div
      className="d-flex gap-3 align-items-center abc"
      style={{ position: "absolute", top: "50%", right: 16, transform: "translateY(-50%)" }}
    >
              {/* <img src={applogo} alt="Big App Logo" style={{ width: 70 }} /> */}

      <div>
        <img
          className="profimg"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
          width={40}
          style={{ borderRadius: "50%", marginRight: "8px" }}
        />
      </div>
      <div className="profdetail">
        {/* <h5 className="name mb-1" style={{ marginTop: "30px" , color:"#fff" }}>Admin</h5>
        <p className="name1 mb-0" style={{marginTop: "-26px"}}>Admin@gmail.com</p> */}
      </div>
    </div>
  </Header>
  <Content
    style={{
      margin: "24px 16px",
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
    }}
  >


    <Menu id="menuMob"
 style={{
  display: isMobile ? (collapsed ? 'none' : 'block') : 'none',
}}              theme="light"
              mode="inline"
              // defaultSelectedKeys={[""]}
              // onClick={({ key }) => {
              //   if (key === "logout") {
              //     handleLogout();

              //   } else {
              //     navigate(key);
              //   }
              // }}
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              items={[
                {
                  key: "",
                  icon: <AiFillDashboard />,
                  label: "Dashboard",
                },
                {
                  key: "Account Management",
                  icon: <AiOutlineUser />,
                  label: "Management",
                  children: [
                    {
                      key: "createaccount",
                      icon: <AiOutlineUserAdd />,
                      label: "Data",
                    },
                   
                  ],
                },
                {
                  key: "bookings",
                  icon: <AiOutlineBook />,
                  label: "Bookings",
                },

                {
                  key: "logout",
                  icon: <AiOutlineLogout />,
                  label: "Logout",
                },
              ]}
            />
    <Outlet />
  </Content>
  
</Layout>

    </Layout>
  );
};

export default CommonSidebar;
