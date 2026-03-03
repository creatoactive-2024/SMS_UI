import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { EmployeeLogin, AdminLogin } from "./components";
import { AnimatePresence } from "framer-motion";
import EmployeeHome from "./components/EmployeeHome";
import Dashboard from "../src/components/admin/Dashboard";
import CreateAccount from "./components/admin/CreateAccount";
import { AccountProvider } from "./context/AccountContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./auth/firebaseConfig";
import "../src/App.css";
import CommonSidebar from "./components/CommonSidebar";

import Bookings from "./components/sidebar menu/bookings/Bookings";
import Bookingscopy from "./components/sidebar menu/bookingscopy/Bookings";


import Enquiries from "./components/sidebar menu/enquiries/Enquiries";
import Enquiriescopy from "./components/sidebar menu/enquiriescopy/Enquiriescopy";

import CourseCategories from "./components/sidebar menu/class scheduling/Resources/CourseCategories";
import CourseLanguages from "./components/sidebar menu/class scheduling/Resources/CourseLanguages";
import CourseLevel from "./components/sidebar menu/class scheduling/Resources/CourseLevel";
import AddCourses from "./components/sidebar menu/class scheduling/Resources/AddCourses";
import Classrooms from "./components/sidebar menu/class scheduling/Resources/others/Classrooms";
import DefaultTime from "./components/sidebar menu/class scheduling/Resources/others/DefaultTime";
import BuildingFloors from "./components/sidebar menu/class scheduling/Resources/others/BuildingFloors";
import ColorCode from "./components/sidebar menu/class scheduling/Resources/others/ColorCode";

import AddClassess from "./components/sidebar menu/class scheduling/class schedule/AddClassess";
import Scheduling from "./components/sidebar menu/class scheduling/class schedule/Scheduling";
import Teacher from "./components/sidebar menu/class scheduling/teacher management/Teacher";

import Agencies from "./components/sidebar menu/marketing/agencyMarketing/Agencies";
import AgentCategory from "./components/sidebar menu/marketing/agencyMarketing/AgentCategory";
import AgentGroup from "./components/sidebar menu/marketing/agencyMarketing/AgentGroup";
import AgentList from "./components/sidebar menu/marketing/agencyMarketing/AgentList";
import CommissionCategories from "./components/sidebar menu/marketing/agencyMarketing/CommissionCategories";
import Complaints from "./components/sidebar menu/marketing/Complaints";
import AddTopics from "./components/sidebar menu/marketing/feedback/AddTopics";
import AddScales from "./components/sidebar menu/marketing/feedback/AddScales";
import AddQuestions from "./components/sidebar menu/marketing/feedback/addQuestions/AddQuestions";
import AddQuestionnaires from "./components/sidebar menu/marketing/feedback/AddQuestionnaires";

import PricesActivity from "./components/sidebar menu/marketing/price and costs/PricesActivity";
import PricesGeneral from "./components/sidebar menu/marketing/price and costs/PricesGeneral";
import PricesInsurance from "./components/sidebar menu/marketing/price and costs/PricesInsurance";

import StudentStatus from "./components/sidebar menu/marketing/otherResources/StudentStatus";
import ComplaintCategories from "./components/sidebar menu/marketing/otherResources/ComplaintCategories";
import CrmSubject from "./components/sidebar menu/marketing/otherResources/CrmSubject";
import HowDidYouHere from "./components/sidebar menu/marketing/otherResources/HowDidYouHere";
import TypeOfContact from "./components/sidebar menu/marketing/otherResources/TypeOfContact";
import Sponsors from "./components/sidebar menu/marketing/sponsors/Sponsors";
import Special from "./components/sidebar menu/marketing/special/Special";

import ReasonManualCreditNotes from "./components/sidebar menu/marketing/marketing_resources/ReasonManualCreditNotes";
import Periods from "./components/sidebar menu/marketing/marketing_resources/periods/Periods";
import PublicHolidays from "./components/sidebar menu/marketing/marketing_resources/PublicHolidays";
import SchoolHolidays from "./components/sidebar menu/marketing/marketing_resources/SchoolHolidays";
import AdditionalFees from "./components/sidebar menu/marketing/marketing_resources/AdditionalFees";
import Cancellation_Fees from "./components/sidebar menu/marketing/marketing_resources/Cancellation_Fees";

import LessonPrice from "./components/sidebar menu/marketing/marketing_resources/LessonPrice";
import WeekCost from "./components/sidebar menu/marketing/marketing_resources/WeekCost";
import WeekPrice from "./components/sidebar menu/marketing/marketing_resources/WeekPrice";

import StudentView from "./components/sidebar menu/students/StudentView";
import ArrivalList from "./components/sidebar menu/students/ArrivalList";
import CheckedInStudent from "./components/sidebar menu/students/CheckedInStudent";
import DepartureList from "./components/sidebar menu/students/DepartureList";
import FeedbackList from "./components/sidebar menu/students/FeedbackList";
import VisaList from "./components/sidebar menu/students/VisaList";
import SponsoredStudent from "./components/sidebar menu/students/SponsoredStudent";

import TransferLocation from "./components/sidebar menu/transfer/TransferLocation";
import TransferPriceCost from "./components/sidebar menu/transfer/costAndPrice/TransferPriceCost";
import TransferProvider from "./components/sidebar menu/transfer/TransferProvider";

import InsuranceProvider from "./components/sidebar menu/insurance/resources/InsuranceProvider";
import InsuranceWeeks from "./components/sidebar menu/insurance/resources/InsuranceWeeks";
import AddInsurance from "./components/sidebar menu/insurance/resources/AddInsurance/AddInsurance";

import Activities from "./components/sidebar menu/Activities/resoources/activitiesForm/Activities";
import ActivitiesProvider from "./components/sidebar menu/Activities/resoources/ActivitiesProvider";

import Companies from "./components/sidebar menu/accounting/Resources/company/Companies";
import TemplateReceiptText from "./components/sidebar menu/accounting/Resources/receiptText/TemplateReceiptText";
import PaymentMethod from "./components/sidebar menu/accounting/Resources/PaymentMethod";
import TaxRate from "./components/sidebar menu/accounting/Resources/TaxRate";
import TermsOfPayment from "./components/sidebar menu/accounting/Resources/TermsOfPayment";
import Overview from "./components/sidebar menu/reporting/Overview";
import OverviewV2 from "./components/sidebar menu/reporting/OverviewV2";
import BasicReports1 from "./components/sidebar menu/reporting/BasicReports1";
import QuarterlyReport from "./components/sidebar menu/reporting/QuarterlyReport";
import FeedbackSums from "./components/sidebar menu/reporting/FeedbackSums";
import AgentRevenues from "./components/sidebar menu/reporting/AgentRevenues";
import DeferredPayments from "./components/sidebar menu/reporting/DeferredPayments";
import DebtorReport from "./components/sidebar menu/reporting/DebtorReport";
import QuicReport from "./components/sidebar menu/reporting/QuicReport";
import AgenciesReport from "./components/sidebar menu/reporting/AgenciesReport";
import Cancellations from "./components/sidebar menu/reporting/Cancellations";
import WhereDidStudentComeFrom from "./components/sidebar menu/reporting/WhereDidStudentComeFrom";

import ReportPages from "./components/sidebar menu/reporting/ResourcesReporting/ReportPages";
import AgeGroups from "./components/sidebar menu/reporting/ResourcesReporting/AgeGroups";
import StatisticsV2 from "./components/sidebar menu/reporting/ResourcesReporting/StatisticsV2";
import TailorMadeReport from "./components/sidebar menu/reporting/ResourcesReporting/Tailor made reports/TailorMadeReport";
import SettingsReport from "./components/sidebar menu/reporting/ResourcesReporting/SettingsReport";
import CostsGeneral from "./components/sidebar menu/marketing/price and costs/CostsGeneral";
import MotherToungePerInbox from "./components/sidebar menu/reporting/MotherToungePerInbox";

import OverviewAdmin from "./components/sidebar menu/admin/employees/OverviewAdmin";
import UserGroups from "./components/sidebar menu/admin/employees/UserGroups";
import CategoriesAdmin from "./components/sidebar menu/admin/employees/CategoriesAdmin";
import ContactAdmin from "./components/sidebar menu/admin/ContactAdmin";
import FileUploads from "./components/sidebar menu/admin/Templates/FileUploads";
import PdfLayouts from "./components/sidebar menu/admin/Templates/pdf layouts/PdfLayouts";
import PdfTemplate from "./components/sidebar menu/admin/Templates/pdf templates/PdfTemplate";
import EmailLayoutHtml from "./components/sidebar menu/admin/Templates/email layout_html/EmailLayoutHtml";
import EmailLayout2 from "./components/sidebar menu/admin/Templates/EmailLayout2";
import EmailTemplates2 from "./components/sidebar menu/admin/Templates/email template2 coop/EmailTemplates2";
import SmsTemplate from "./components/sidebar menu/admin/Templates/sms template/SmsTemplate";
import AppTemplates from "./components/sidebar menu/admin/Templates/app templates/AppTemplates";
import ContractType from "./components/sidebar menu/admin/Templates/ContractType";
import InboxList from "./components/sidebar menu/admin/administration/InboxList";
import NumberRange from "./components/sidebar menu/admin/administration/NumberRange";
import SystemUpdate from "./components/sidebar menu/admin/administration/SystemUpdate";
import GeneralSetting from "./components/sidebar menu/admin/administration/GeneralSetting";
import EmailAccounts from "./components/sidebar menu/admin/administration/EmailAccounts";
import ExchangeRate from "./components/sidebar menu/admin/administration/ExchangeRate";
import EventControl from "./components/sidebar menu/admin/administration/event control/EventControl";
import EmailSpool from "./components/sidebar menu/admin/administration/EmailSpool";
import CategoriesForAbsense from "./components/sidebar menu/admin/other/CategoriesForAbsense";
import VisaTypes from "./components/sidebar menu/admin/other/VisaTypes";
import Fonts from "./components/sidebar menu/admin/other/Fonts";
import InvoicePosition from "./components/sidebar menu/admin/other/InvoicePosition";
import { PointOfSale } from "@mui/icons-material";
import PointsOfSale from "./components/sidebar menu/admin/other/PointsOfSale";
import CommunicationCategories from "./components/sidebar menu/admin/other/CommunicationCategories";
import OnlineForm from "./components/sidebar menu/admin/frontend/OnlineForm";
import FrontendTranslation from "./components/sidebar menu/admin/frontend/FrontendTranslation";
import ApiToken from "./components/sidebar menu/admin/frontend/ApiToken";
import Templates from "./components/sidebar menu/admin/frontend/Templates";
import Combinations from "./components/sidebar menu/admin/frontend/Combinations";
import AppContent from "./components/sidebar menu/admin/frontend/AppContent";
import CourseStructure from "./components/sidebar menu/admin/frontend/CourseStructure";
import OverarchingCourses from "./components/sidebar menu/admin/frontend/OverarchingCourses";
import FilterSets from "./components/sidebar menu/admin/user interface/Filter sets/FilterSets";
import CustomFields from "./components/sidebar menu/admin/user interface/CustomFields";
import CustomUploadFields from "./components/sidebar menu/admin/user interface/CustomUploadFields";
import FailedBackgroundTask from "./components/sidebar menu/admin/Background tasks/FailedBackgroundTask";
import AdminLog from "./components/sidebar menu/admin/AdminLog";
import DigitalScreens from "./components/sidebar menu/admin/digital screen/DigitalScreens";
import Schools from "./components/sidebar menu/admin/administration/schools/Schools";

import DocumentOverview from "./components/sidebar menu/accounting/invoice overview/DocumentOverview";
import ReleaseDocument from "./components/sidebar menu/accounting/invoice overview/ReleaseDocument";
import BookingStack from "./components/sidebar menu/accounting/invoice overview/BookingStack";
import ConvertPerforma from "./components/sidebar menu/accounting/invoice overview/ConvertPerforma";
import PartialInvoice from "./components/sidebar menu/accounting/invoice overview/PartialInvoice";
import ClientPayment from "./components/sidebar menu/accounting/Incoming payments/ClientPayment";
import AgentPayments from "./components/sidebar menu/accounting/Incoming payments/AgentPayments";
import AgencyEmployee from "./components/sidebar menu/marketing/agencyEmployee/AgencyEmployee";
import IncomingPayments from "./components/sidebar menu/accounting/Incoming payments/IncomingPayments";
import PaymentDetails from "./components/sidebar menu/accounting/Incoming payments/PaymentDetails";
import AccountsReceivable from "./components/sidebar menu/accounting/Incoming payments/AccountsReceivable";
import AssignPayments from "./components/sidebar menu/accounting/Incoming payments/AssignPayments";
import AgedDebtorsReports from "./components/sidebar menu/accounting/Incoming payments/AgedDebtorsReports";
import PayCommission from "./components/sidebar menu/accounting/Outgoing payments/PayCommission";
import ManualCreditNote from "./components/sidebar menu/accounting/Outgoing payments/ManualCreditNote";
import OverPayments from "./components/sidebar menu/accounting/Outgoing payments/OverPayments";
import Checks from "./components/sidebar menu/accounting/Outgoing payments/Checks";
import PayTeachers from "./components/sidebar menu/accounting/pay provider/PayTeachers";
import PaidTeachers from "./components/sidebar menu/accounting/pay provider/PaidTeachers";
import PayAccommodationProvider from "./components/sidebar menu/accounting/pay provider/PayAccommodationProvider";
import PaidAccommodation from "./components/sidebar menu/accounting/pay provider/PaidAccommodation";
import PayTransfer from "./components/sidebar menu/accounting/pay provider/PayTransfer";
import PaidTransfer from "./components/sidebar menu/accounting/pay provider/PaidTransfer";
import DashboardNew from "../src/components/sidebar menu/dashboard/DashboardNew";
import SchedulingReplica from "./components/sidebar menu/class scheduling/class schedule/SchedulingReplica";
import AddClassessnew from "./components/sidebar menu/class scheduling/class schedule/AddClassessnew";
import Booking_to_be_classed from "./components/sidebar menu/bookingscopy/bookingToBeClassed/Booking_to_be_classed";
import Provisional_booking from "./components/sidebar menu/bookingscopy/provisionalBooking/Provisional_booking";
import DashboardContainer from "./components/sidebar menu/dashboard/DashboardContainer";
import Addprice from "./components/sidebar menu/pricing/Addprice";
import PricingSeasonPage from "./components/sidebar menu/pricing/pages/PricingSeasonPage";
import BasePricingPage from "./components/sidebar menu/pricing/pages/BasePricingPage";
import PricePreviewPage from "./components/sidebar menu/pricing/pages/PricePreviewPage";
import SeasonDiscountPage from "./components/sidebar menu/pricing/pages/SeasonDiscountPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Set loading to false once the authentication state is checked.
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    // You can render a loading spinner or some indication that the app is checking the authentication state.
    return <div>Loading...</div>;
  }

  return (
    // <Router>
    <AnimatePresence>
      <>
        <ToastContainer position="top-center" />

        <Routes>
          <Route path="/employeeLogin" element={<EmployeeLogin />} />
          <Route
            path="/employeeHome"
            element={user ? <EmployeeHome /> : <Navigate to="/employeeLogin" />}
          />
          <Route path="/" element={<AdminLogin />} />
          <Route
            path="/adminDashboard/*"
            element={
              user ? (
                <AccountProvider>
                  <CommonSidebar />
                </AccountProvider>
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route index element={<Enquiries />} />
            <Route
              path="createaccount"
              element={
                user ? (
                  <AccountProvider>
                    <CreateAccount />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="enquiries"
              element={
                user ? (
                  <AccountProvider>
                    <Enquiries />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
{/* enquiry 2.0 */}
<Route
              path="enquiriescopy"
              element={
                user ? (
                  <AccountProvider>
                    <Enquiriescopy />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />


            <Route
              path="bookings"
              element={
                user ? (
                  <AccountProvider>
                    <Bookings />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

{/* booking 2.0 */}
<Route
              path="bookingscopy"
              element={
                user ? (
                  <AccountProvider>
                    <Bookingscopy />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />


            <Route
              path="bookings_to_be_classed"
              element={
                user ? (
                  <AccountProvider>
                    <Booking_to_be_classed />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />


            <Route
              path="provisional_bookings"
              element={
                user ? (
                  <AccountProvider>
                    <Provisional_booking />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

{/* booking 2.0 end */}
<Route
              path="dashboard"
              element={
                user ? (
                  <AccountProvider>
                    <DashboardContainer />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />



  <Route
              path="add_prices"
              element={
                user ? (
                  <AccountProvider>
                    <Addprice />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

 <Route
              path="base_price"
              element={
                user ? (
                  <AccountProvider>
                    <BasePricingPage />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

             <Route
              path="preview_price"
              element={
                user ? (
                  <AccountProvider>
                    <PricePreviewPage />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

<Route
              path="discount_price"
              element={
                user ? (
                  <AccountProvider>
                    <SeasonDiscountPage />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />


            <Route
              path="pricing_seasons"
              element={
                user ? (
                  <AccountProvider>
                    <PricingSeasonPage />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />



            <Route
              path="courses"
              element={
                user ? (
                  <AccountProvider>
                    <AddCourses />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="courses_categories"
              element={
                user ? (
                  <AccountProvider>
                    <CourseCategories />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="levels"
              element={
                user ? (
                  <AccountProvider>
                    <CourseLevel />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="course_languages"
              element={
                user ? (
                  <AccountProvider>
                    <CourseLanguages />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="classrooms"
              element={
                user ? (
                  <AccountProvider>
                    <Classrooms />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="buildings_floors"
              element={
                user ? (
                  <AccountProvider>
                    <BuildingFloors />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="default_time"
              element={
                user ? (
                  <AccountProvider>
                    <DefaultTime />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="color_codes"
              element={
                user ? (
                  <AccountProvider>
                    <ColorCode />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="classes"
              element={
                user ? (
                  <AccountProvider>
                    <AddClassess />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="scheduling"
              element={
                user ? (
                  <AccountProvider>
                    <Scheduling />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />


 <Route
              path="schedulingreplica"
              element={
                user ? (
                  <AccountProvider>
                    <SchedulingReplica />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

  <Route
              path="classesnew"
              element={
                user ? (
                  <AccountProvider>
                    <AddClassessnew />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="teacher"
              element={
                user ? (
                  <AccountProvider>
                    <Teacher />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="agency"
              element={
                user ? (
                  <AccountProvider>
                    <Agencies />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="agent_category"
              element={
                user ? (
                  <AccountProvider>
                    <AgentCategory />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="agent_group"
              element={
                user ? (
                  <AccountProvider>
                    <AgentGroup />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="commission_categories"
              element={
                user ? (
                  <AccountProvider>
                    <CommissionCategories />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="agent_list"
              element={
                user ? (
                  <AccountProvider>
                    <AgentList />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="complaints"
              element={
                user ? (
                  <AccountProvider>
                    <Complaints />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="add_topic"
              element={
                user ? (
                  <AccountProvider>
                    <AddTopics />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="add_question"
              element={
                user ? (
                  <AccountProvider>
                    <AddQuestions />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="add_scale"
              element={
                user ? (
                  <AccountProvider>
                    <AddScales />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="add_questionnaires"
              element={
                user ? (
                  <AccountProvider>
                    <AddQuestionnaires />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="student_status"
              element={
                user ? (
                  <AccountProvider>
                    <StudentStatus />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="complaint_category"
              element={
                user ? (
                  <AccountProvider>
                    <ComplaintCategories />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="how_did_you_here"
              element={
                user ? (
                  <AccountProvider>
                    <HowDidYouHere />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="crm_subject"
              element={
                user ? (
                  <AccountProvider>
                    <CrmSubject />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="type_of_contact"
              element={
                user ? (
                  <AccountProvider>
                    <TypeOfContact />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="sponsors"
              element={
                user ? (
                  <AccountProvider>
                    <Sponsors />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="price_activities"
              element={
                user ? (
                  <AccountProvider>
                    <PricesActivity />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="price_general"
              element={
                user ? (
                  <AccountProvider>
                    <PricesGeneral />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="price_insurance"
              element={
                user ? (
                  <AccountProvider>
                    <PricesInsurance />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="cost_general"
              element={
                user ? (
                  <AccountProvider>
                    <CostsGeneral />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="special"
              element={
                user ? (
                  <AccountProvider>
                    <Special />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="reasons_manual_credit_notes"
              element={
                user ? (
                  <AccountProvider>
                    <ReasonManualCreditNotes />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="periods"
              element={
                user ? (
                  <AccountProvider>
                    <Periods />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="public_holidays"
              element={
                user ? (
                  <AccountProvider>
                    <PublicHolidays />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="school_holidays"
              element={
                user ? (
                  <AccountProvider>
                    <SchoolHolidays />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="additional_fees"
              element={
                user ? (
                  <AccountProvider>
                    <AdditionalFees />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="cancellation_fees"
              element={
                user ? (
                  <AccountProvider>
                    <Cancellation_Fees />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="lesson_price"
              element={
                user ? (
                  <AccountProvider>
                    <LessonPrice />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="week_cost"
              element={
                user ? (
                  <AccountProvider>
                    <WeekCost />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="week_price"
              element={
                user ? (
                  <AccountProvider>
                    <WeekPrice />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="studentView"
              element={
                user ? (
                  <AccountProvider>
                    <StudentView />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="arrivaList"
              element={
                user ? (
                  <AccountProvider>
                    <ArrivalList />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="checkedInstdents"
              element={
                user ? (
                  <AccountProvider>
                    <CheckedInStudent />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="depatureList"
              element={
                user ? (
                  <AccountProvider>
                    <DepartureList />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="feedbackList"
              element={
                user ? (
                  <AccountProvider>
                    <FeedbackList />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="visaList"
              element={
                user ? (
                  <AccountProvider>
                    <VisaList />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="sponsoredStudents"
              element={
                user ? (
                  <AccountProvider>
                    <SponsoredStudent />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="transferLocation"
              element={
                user ? (
                  <AccountProvider>
                    <TransferLocation />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="transferProvider"
              element={
                user ? (
                  <AccountProvider>
                    <TransferProvider />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="transferPricesCosts"
              element={
                user ? (
                  <AccountProvider>
                    <TransferPriceCost />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="InsuranceProvider"
              element={
                user ? (
                  <AccountProvider>
                    <InsuranceProvider />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="insuranceWeeks"
              element={
                user ? (
                  <AccountProvider>
                    <InsuranceWeeks />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="insurance"
              element={
                user ? (
                  <AccountProvider>
                    <AddInsurance />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="activities"
              element={
                user ? (
                  <AccountProvider>
                    <Activities />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="activitiesProvider"
              element={
                user ? (
                  <AccountProvider>
                    <ActivitiesProvider />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="companies"
              element={
                user ? (
                  <AccountProvider>
                    <Companies />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="taxRate"
              element={
                user ? (
                  <AccountProvider>
                    <TaxRate />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="receipt_texts"
              element={
                user ? (
                  <AccountProvider>
                    <TemplateReceiptText />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="accountingPaymentMethod"
              element={
                user ? (
                  <AccountProvider>
                    <PaymentMethod />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="termsOfPayments"
              element={
                user ? (
                  <AccountProvider>
                    <TermsOfPayment />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="reportPages"
              element={
                user ? (
                  <AccountProvider>
                    <ReportPages />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="age_group"
              element={
                user ? (
                  <AccountProvider>
                    <AgeGroups />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="tailor_made_reports"
              element={
                user ? (
                  <AccountProvider>
                    <TailorMadeReport />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="statistic_v2"
              element={
                user ? (
                  <AccountProvider>
                    <StatisticsV2 />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="report_setting"
              element={
                user ? (
                  <AccountProvider>
                    <SettingsReport />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="overview"
              element={
                user ? (
                  <AccountProvider>
                    <Overview />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="overview_v2"
              element={
                user ? (
                  <AccountProvider>
                    <OverviewV2 />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="basic_reports1"
              element={
                user ? (
                  <AccountProvider>
                    <BasicReports1 />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="quarterly_report"
              element={
                user ? (
                  <AccountProvider>
                    <QuarterlyReport />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="mothertounge_per_inbox"
              element={
                user ? (
                  <AccountProvider>
                    <MotherToungePerInbox />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="feedback_sums"
              element={
                user ? (
                  <AccountProvider>
                    <FeedbackSums />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="agent_revenue"
              element={
                user ? (
                  <AccountProvider>
                    <AgentRevenues />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="deferred_payments"
              element={
                user ? (
                  <AccountProvider>
                    <DeferredPayments />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="debtor_report"
              element={
                user ? (
                  <AccountProvider>
                    <DebtorReport />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="quic_report"
              element={
                user ? (
                  <AccountProvider>
                    <QuicReport />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="agency_report"
              element={
                user ? (
                  <AccountProvider>
                    <AgenciesReport />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="cancellations"
              element={
                user ? (
                  <AccountProvider>
                    <Cancellations />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="students_come_from"
              element={
                user ? (
                  <AccountProvider>
                    <WhereDidStudentComeFrom />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            {/* admin section */}
            <Route
              path="overview_admin"
              element={
                user ? (
                  <AccountProvider>
                    <OverviewAdmin />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="user_group"
              element={
                user ? (
                  <AccountProvider>
                    <UserGroups />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="categories_admin"
              element={
                user ? (
                  <AccountProvider>
                    <CategoriesAdmin />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="contact_admin"
              element={
                user ? (
                  <AccountProvider>
                    <ContactAdmin />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="file_uploads"
              element={
                user ? (
                  <AccountProvider>
                    <FileUploads />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="pdf_layouts"
              element={
                user ? (
                  <AccountProvider>
                    <PdfLayouts />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="pdf_templates"
              element={
                user ? (
                  <AccountProvider>
                    <PdfTemplate />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="email_layout_html"
              element={
                user ? (
                  <AccountProvider>
                    <EmailLayoutHtml />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="email_layout_co-op"
              element={
                user ? (
                  <AccountProvider>
                    <EmailLayout2 />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="email_template2"
              element={
                user ? (
                  <AccountProvider>
                    <EmailTemplates2 />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="sms_template"
              element={
                user ? (
                  <AccountProvider>
                    <SmsTemplate />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="app_template"
              element={
                user ? (
                  <AccountProvider>
                    <AppTemplates />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="contract_type"
              element={
                user ? (
                  <AccountProvider>
                    <ContractType />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="schools"
              element={
                user ? (
                  <AccountProvider>
                    <Schools />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="inbox_list"
              element={
                user ? (
                  <AccountProvider>
                    <InboxList />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="number_range"
              element={
                user ? (
                  <AccountProvider>
                    <NumberRange />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="system_update"
              element={
                user ? (
                  <AccountProvider>
                    <SystemUpdate />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="general_setting"
              element={
                user ? (
                  <AccountProvider>
                    <GeneralSetting />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="email_accounts"
              element={
                user ? (
                  <AccountProvider>
                    <EmailAccounts />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="exchange_rates"
              element={
                user ? (
                  <AccountProvider>
                    <ExchangeRate />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="event_control"
              element={
                user ? (
                  <AccountProvider>
                    <EventControl />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="email_spool"
              element={
                user ? (
                  <AccountProvider>
                    <EmailSpool />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="categories_for_absence"
              element={
                user ? (
                  <AccountProvider>
                    <CategoriesForAbsense />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="visa_type"
              element={
                user ? (
                  <AccountProvider>
                    <VisaTypes />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="fonts"
              element={
                user ? (
                  <AccountProvider>
                    <Fonts />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="invoice_position"
              element={
                user ? (
                  <AccountProvider>
                    <InvoicePosition />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="point_of_sale"
              element={
                user ? (
                  <AccountProvider>
                    <PointsOfSale />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="communication_category"
              element={
                user ? (
                  <AccountProvider>
                    <CommunicationCategories />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="online_form"
              element={
                user ? (
                  <AccountProvider>
                    <OnlineForm />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="frontend_translation"
              element={
                user ? (
                  <AccountProvider>
                    <FrontendTranslation />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="api_token"
              element={
                user ? (
                  <AccountProvider>
                    <ApiToken />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="templates_frontend"
              element={
                user ? (
                  <AccountProvider>
                    <Templates />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="combinations"
              element={
                user ? (
                  <AccountProvider>
                    <Combinations />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="App_content_frontend"
              element={
                user ? (
                  <AccountProvider>
                    <AppContent />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="course_structure"
              element={
                user ? (
                  <AccountProvider>
                    <CourseStructure />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="overarching_courses"
              element={
                user ? (
                  <AccountProvider>
                    <OverarchingCourses />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="filter_sets"
              element={
                user ? (
                  <AccountProvider>
                    <FilterSets />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="custom_fields"
              element={
                user ? (
                  <AccountProvider>
                    <CustomFields />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="custom_upload_fields"
              element={
                user ? (
                  <AccountProvider>
                    <CustomUploadFields />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="failed_background_task"
              element={
                user ? (
                  <AccountProvider>
                    <FailedBackgroundTask />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="log"
              element={
                user ? (
                  <AccountProvider>
                    <AdminLog />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="digital_screens"
              element={
                user ? (
                  <AccountProvider>
                    <DigitalScreens />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="document_overview"
              element={
                user ? (
                  <AccountProvider>
                    <DocumentOverview />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="release_docs"
              element={
                user ? (
                  <AccountProvider>
                    <ReleaseDocument />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="booking_stack"
              element={
                user ? (
                  <AccountProvider>
                    <BookingStack />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="convert_proforma"
              element={
                user ? (
                  <AccountProvider>
                    <ConvertPerforma />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="partial_invoices"
              element={
                user ? (
                  <AccountProvider>
                    <PartialInvoice />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="client_payments"
              element={
                user ? (
                  <AccountProvider>
                    <ClientPayment />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="agent_payments"
              element={
                user ? (
                  <AccountProvider>
                    <AgentPayments />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="agency_employee"
              element={
                user ? (
                  <AccountProvider>
                    <AgencyEmployee />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="incoming_payment"
              element={
                user ? (
                  <AccountProvider>
                    <IncomingPayments />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="payment_details"
              element={
                user ? (
                  <AccountProvider>
                    <PaymentDetails />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="account_receivable"
              element={
                user ? (
                  <AccountProvider>
                    <AccountsReceivable />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="assign_payments"
              element={
                user ? (
                  <AccountProvider>
                    <AssignPayments />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="aged_debtor_reports"
              element={
                user ? (
                  <AccountProvider>
                    <AgedDebtorsReports />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="pay_commission"
              element={
                user ? (
                  <AccountProvider>
                    <PayCommission />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="manual_credit_notes"
              element={
                user ? (
                  <AccountProvider>
                    <ManualCreditNote />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="overpayments"
              element={
                user ? (
                  <AccountProvider>
                    <OverPayments />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="checks"
              element={
                user ? (
                  <AccountProvider>
                    <Checks />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="pay_teachers"
              element={
                user ? (
                  <AccountProvider>
                    <PayTeachers />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
             <Route
              path="paid_teachers"
              element={
                user ? (
                  <AccountProvider>
                    <PaidTeachers />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="pay_accommodation_provider"
              element={
                user ? (
                  <AccountProvider>
                    <PayAccommodationProvider />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="paid_accommodation"
              element={
                user ? (
                  <AccountProvider>
                    <PaidAccommodation />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="pay_transfers"
              element={
                user ? (
                  <AccountProvider>
                    <PayTransfer />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
             <Route
              path="paid_transfers"
              element={
                user ? (
                  <AccountProvider>
                    <PaidTransfer />
                  </AccountProvider>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Route>
        </Routes>
      </>
    </AnimatePresence>
    // </Router>
  );
}

export default App;
