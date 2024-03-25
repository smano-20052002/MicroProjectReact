import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeComponent from '../Component/HomeComponent'
import LoginComponent from '../Component/LoginComponent'
import AdminDashboardComponent from '../Component/AdminDashboardComponent'
import PrivateRouting from './PrivateRouting'
import MasterPage from '../Component/MasterPage'
import ChangePasswordComponent from '../Component/ChangePasswordComponent'
import WelcomePage from '../Component/WelcomePage'
import AdminRouting from './AdminRouting'
import NotFoundComponent from '../Component/NotFoundComponent'
import UnAuthorizedComponent from '../Component/UnAuthorizedComponent'
import ViewHospitalComponent from '../Component/ViewHospitalComponent'
import ViewDonorComponent from '../Component/ViewDonorComponent'
import ViewBloodBankComponent from '../Component/ViewBloodBankComponent'
import ViewBloodCampComponent from '../Component/ViewBloodCampComponent'
import DonorRouting from './DonorRouting'
import BloodRequestComponent from '../Component/BloodRequestComponent'
import BloodBankRouting from './BloodBankRouting'
import BloodBankComponent from '../Component/BloodBankComponent'
import IndividualBloodCampComponent from '../Component/IndividualBloodCampComponent'
import AddBloodCampComponent from '../Component/AddBloodCampComponent'
import IndividualBloodStock from '../Component/IndividualBloodStock'
import AddBloodStockComponent from '../Component/AddBloodStockComponent'
import RejectComponent from '../Component/RejectComponent'
import PendingComponent from '../Component/PendingComponent'
import HospitalRequestComponent from '../Component/HospitalRequestComponent'
import DonorRequestComponent from '../Component/DonorRequestComponent'
import BloodBankRequestComponent from '../Component/BloodBankRequestComponent'
import DonorComponent from '../Component/DonorComponent'
import BloodBankAdminHospitalRouting from './BloodBankAdminHospitalRouting'
import HospitalDashboard from '../Component/HospitalDashboard'
import AddBloodRequestComponent from '../Component/AddBloodRequestComponent'
import ForgetPasswordComponent from '../Component/ForgetPasswordComponent'
import UpdateBloodTransaction from '../Component/UpdateBloodTransaction'
import ViewBloodTransaction from '../Component/ViewBloodTransaction'
import RegisterDonorComponent from '../Component/RegisterDonorComponent'
import RegisterComponent from '../Component/RegisterComponent'

function RouteSetting() {

    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route element={<MasterPage />}>
                        <Route element={<PrivateRouting />}>
                            <Route element={<BloodBankRouting />}>
                                <Route element={<BloodBankComponent />} path='/bankhome'></Route>
                                <Route element={<IndividualBloodCampComponent />} path='/bankbloodcamp'></Route>
                                <Route element={<IndividualBloodStock />} path="/bankbloodstock"></Route>
                                <Route element={<UpdateBloodTransaction/>} path='/updatebloodtransaction'></Route>
                                <Route element={<ViewBloodTransaction/>} path='/viewbloodtransaction'></Route>
                                <Route element={<AddBloodCampComponent />} path='/addbankbloodcamp'></Route>
                                <Route element={<AddBloodStockComponent />} path='/addbloodstock'></Route>

                            </Route>
                            <Route element={<AdminRouting />}>
                                <Route element={<AdminDashboardComponent />} path="/admindashboard" />
                                <Route element={<ViewHospitalComponent />} path="/viewhospital" />
                                {/* <Route element={<ViewBloodBankComponent/>} path="/viewbloodbank" /> */}
                                <Route element={<ViewBloodCampComponent />} path="/viewbloodcamp" />
                                <Route element={<HospitalRequestComponent />} path='/hospitalrequest'></Route>
                                <Route element={<DonorRequestComponent />} path='/donorrequest'></Route>
                                <Route element={<BloodBankRequestComponent />} path='/bloodbankrequest'></Route>
                                {/* <Route element={<AccountRequestComponent/>} path="/viewaccountrequest" /> */}
                                <Route element={<BloodRequestComponent />} path="/viewbloodrequest" />

                            </Route>
                            <Route element={<DonorRouting />}>
                                <Route element={<DonorComponent />} path='/donorhome'></Route>
                            </Route>
                            <Route element={<BloodBankAdminHospitalRouting />}>
                                <Route element={<ViewDonorComponent />} path="/viewdonor" />
                                <Route element={<ViewBloodBankComponent />} path="/viewbloodbank" />
                                <Route element={<HospitalDashboard />} path="/hospitalhome" />
                                

                            </Route>

                            <Route element={<HomeComponent />} path="/home" />
                        </Route>
                        <Route element={<AddBloodRequestComponent/>} path='/addbloodrequest'></Route>
                        <Route element={<LoginComponent />} path="/login" />
                        <Route element={<WelcomePage />} path='/' exact index />
                        <Route element={<ForgetPasswordComponent/>} path='/forgetpassword'/>
                        <Route element={<NotFoundComponent />} path='*' />
                        <Route element={<UnAuthorizedComponent />} path='/unauthorized' />
                        <Route element={<ChangePasswordComponent />} path='/changepassword' />
                        <Route element={<RejectComponent />} path='/reject'></Route>
                        <Route element={<PendingComponent />} path='/pending'></Route>
                        <Route element={<RegisterDonorComponent/>} path='/newdonorrequest'></Route>
                        <Route element={<RegisterComponent/>} path='/register'></Route>
                    </Route>

                </Routes>
            </BrowserRouter>


        </>
    )
}

export default RouteSetting