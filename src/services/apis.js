import axiosInstance from './axiosInterceptor';
import axiosUserInstance from './axiosInterceptoruser';


// const baseUrl = "http://ec2-13-235-113-158.ap-south-1.compute.amazonaws.com:3000";
const baseUrl = process.env.REACT_APP_ZUPOTSU_API_BASE_URL;
const baseUserUrl = process.env.REACT_APP_ZUPOTSU_API_BASE_USER_URL;

class Apis {

    get headers() {
        // return {
        //     user_id: localStorage.getItem("userID"),
        //     token: localStorage.getItem("accessToken")
        // };
    }

    addForm(body) {
        return axiosInstance.post(baseUrl + `/api/templates`, body, { headers: this.headers })
    }

    updateForm(body) {
        return axiosInstance.put(baseUrl + `/api/templates/${body.id}`, body, { headers: this.headers })
    }

    getFormByAssetTypeSport(body) {
        if (body.sport) {
            return axiosInstance.get(baseUrl + `/api/templates?asset_type_id=${body.asset_type_id}&sport=${body.sport}&sport_type=${body.sportType}&is_active=true`, { headers: this.headers })
        }
        else {
            return axiosInstance.get(baseUrl + `/api/templates?asset_type_id=${body.asset_type_id}&sport_type=${body.sportType}&is_active=true`, { headers: this.headers })
        }
    }

    getAllForms(body) {
        return axiosInstance.get(baseUrl + `/api/templates`, { headers: this.headers })
    }

    getFormByID(id) {
        return axiosInstance.get(baseUrl + `/api/templates?id=${id}`, { headers: this.headers })
    }

    validatelogin(emailid) {
        return axiosInstance.get(baseUserUrl + `/api/user/${emailid}`, { headers: this.headers })
    }

    getAssetTypes() {
        return axiosInstance.get(baseUrl + '/api/assettypes', { headers: this.headers })
    }

    getAllSports() {
        return axiosInstance.get(baseUrl + '/api/primary_attributes?id=55', { headers: this.headers })
    }

    getAllPrimaryAttributes() {
        return axiosInstance.get(baseUrl + '/api/primary_attributes', { headers: this.headers })
    }
    getAllPrimaryAttributesSports() {
        return axiosInstance.get(baseUrl + '/api/primary_attributes/sports')
    }

    publishForm(body) {
        return axiosInstance.post(baseUrl + `/api/templates/publish/${body.id}`, body, { headers: this.headers })
    }

    deleteForm(body) {
        return axiosInstance.delete(baseUrl + `/api/templates/${body.id}`, { headers: this.headers })
    }

    addAsset(body) {
        return axiosInstance.post(baseUrl + `/api/assets`, body, { headers: this.headers })
    }

    getAllAssets() {
        return axiosInstance.get(baseUrl + '/api/assets', { headers: this.headers })
    }

    addOppurtunity(body) {
        return axiosInstance.post(baseUrl + `/api/opportunities`, body, { headers: this.headers })
    }

    getS3URLs(files) {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        return axiosInstance.post(baseUrl + '/api/media/upload', formData, { headers: this.headers });
    }

    getS3URL(file) {
        const formData = new FormData();
        formData.append('file', file);

        return axiosInstance.post(baseUrl + '/api/media/upload', formData, { headers: this.headers });
    }

    getAssetByID(id) {
        return axiosInstance.get(baseUrl + `/api/assets?id=${id}`, { headers: this.headers })
    }

    updateAsset(body) {
        return axiosInstance.put(baseUrl + `/api/assets/${body.id}`, body, { headers: this.headers })
    }

    updateOpportunity(body, id) {
        return axiosInstance.put(baseUrl + `/api/opportunities`, body, { headers: this.headers })
    }

    deleteOpportunity(id) {
        return axiosInstance.delete(baseUrl + `/api/opportunities/${id}`, { headers: this.headers })
    }

    addTray(body) {
        return axiosInstance.post(baseUrl + `/api/trays`, body, { headers: this.headers })
    }

    updateTray(body) {
        return axiosInstance.put(baseUrl + `/api/trays/${body.id}`, body, { headers: this.headers })
    }

    getAllTrays() {
        return axiosInstance.get(baseUrl + '/api/trays', { headers: this.headers })
    }

    getTray(id) {
        return axiosInstance.get(baseUrl + `/api/trays?id=${id}`, { headers: this.headers })
    }

    publishTray(id) {
        return axiosInstance.post(baseUrl + `/api/trays/publish/${id}`, {}, { headers: this.headers })
    }

    deleteTray(id) {
        return axiosInstance.delete(baseUrl + `/api/trays/${id}`, { headers: this.headers })
    }

    prioritizeTray(body) {
        return axiosInstance.post(baseUrl + `/api/trays/prioritize`, body, { headers: this.headers })
    }

    prioritizeBanner(body) {
        return axiosInstance.post(baseUrl + `/api/banners/prioritize`, body, { headers: this.headers })
    }

    addBanner(body) {
        return axiosInstance.post(baseUrl + `/api/banners`, body, { headers: this.headers })
    }

    updateBanner(body) {
        return axiosInstance.put(baseUrl + `/api/banners/${body.id}`, body, { headers: this.headers })
    }

    getAllBanner() {
        return axiosInstance.get(baseUrl + '/api/banners', { headers: this.headers })
    }

    getBanner(id) {
        return axiosInstance.get(baseUrl + `/api/banners?id=${id}`, { headers: this.headers })
    }

    publishBanner(id) {
        return axiosInstance.post(baseUrl + `/api/banners/publish/${id}`, '', { headers: this.headers })
    }

    deleteBanner(id) {
        return axiosInstance.delete(baseUrl + `/api/banners/${id}`, { headers: this.headers })
    }
    filters() {
        return axiosInstance.get(baseUrl + `/api/assets/searchfilters`, { headers: this.headers })
    }
    searchAsset(body) {
        return axiosInstance.post(baseUrl + `/api/assets/search`, body, { headers: this.headers })
    }
    getCountries() {
        return axiosInstance.get(baseUrl + `/api/common/countries`, { headers: this.headers })
    }
    getStateCities(state, country) {
        return axiosInstance.get(baseUrl + `/api/common/cities?state=${state}&country=${country}`)
    }
    deleteAsset(id) {
        return axiosInstance.delete(baseUrl + `/api/assets/${id}`)
    }
    getUsers() {
        return axiosUserInstance.get(baseUserUrl + `/api/user`, { headers: this.headers })
    }
    getUsersId(id) {
        return axiosUserInstance.get(baseUserUrl + `/api/user?id=${id}`, { headers: this.headers })
    }
    getRoles() {
        return axiosInstance.get(baseUserUrl + `/api/roles`, { headers: this.headers })
    }
    onChangeRole(body) {
        return axiosInstance.post(baseUserUrl + `/api/user/changeuserrole`, body, { headers: this.headers })
    }
    updateUsers(id, body) {
        return axiosInstance.put(baseUserUrl + `/api/user/${id}`, body, { headers: this.headers })
    }

    changepassword(id, body) {
        return axiosUserInstance.post(baseUserUrl + `/api/user/changepassword/${id}`, body, { headers: this.headers })
    }
    getOTP(body) {
        return axiosUserInstance.post(baseUserUrl + `/api/user/requestotp`, body)
    }
    doRegister(body) {
        return axiosUserInstance.post(baseUserUrl + `/api/user/register`, body)
    }
    login(body) {
        return axiosUserInstance.post(baseUserUrl + `/api/user/login`, body)
    }
    quickregister(body) {
        return axiosUserInstance.post(baseUserUrl + `/api/user/quickRegister`, body)
    }
    updatequickregister(body, id) {
        return axiosUserInstance.put(baseUserUrl + `/api/user/quickReg/${id}`, body, { headers: this.headers })
    }
    resetPassword(body) {
        return axiosUserInstance.post(baseUserUrl + `/api/user/resetpasswordlink`, body)
    }
    forgotPassword(body) {
        return axiosUserInstance.post(baseUserUrl + `/api/user/resetpassword`, body)
    }

    userRegisterLink(body) {
        return axiosInstance.post(baseUserUrl + `/api/user/registerlink`, body, { headers: this.headers })
    }

    userDelete(id, body) {
        return axiosInstance.post(baseUserUrl + `/api/user/delete/${id}`, body, { headers: this.headers })
    }

    getSportsMedia() {
        return axiosInstance.get(baseUrl + `/api/sportsmedia`)
    }

    getCurrency() {
        return axiosInstance.get(baseUrl + `/api/currency`
        )
    }

    getAllOrgs() {
        return axiosInstance.get(baseUserUrl + `/api/organizations`, { headers: this.headers })
    }

    getAllBannerIF() {
        return axiosInstance.get(baseUrl + '/api/banners/open', { headers: this.headers })
    }

    getAllTraysIF() {
        return axiosInstance.get(baseUrl + '/api/trays/open', { headers: this.headers })
    }

    getAllProposals() {
        return axiosInstance.get(baseUrl + '/api/proposal', { headers: this.headers })
    }

    getAllProposalById(id) {
        return axiosInstance.get(baseUrl + `/api/proposal?id=${id}`, { headers: this.headers })
    }

    addProposal(body) {
        return axiosInstance.post(baseUrl + `/api/proposal`, body, { headers: this.headers })
    }

    updateProposal(id, body) {
        return axiosInstance.put(baseUrl + `/api/proposal/${id}`, body, { headers: this.headers })
    }

    deleteProposal(id) {
        return axiosInstance.get(baseUrl + `/api/proposal/${id}`, { headers: this.headers })
    }

    proposalLastSeen(body) {
        return axiosInstance.post(baseUrl + `/api/proposal/proposallastseen`, body, { headers: this.headers })
    }


    addProposalLeadStatus(body) {
        return axiosInstance.post(baseUrl + `/api/proposal/pls`, body, { headers: this.headers })
    }

    updateProposalLeadStatus(id, body) {
        return axiosInstance.put(baseUrl + `/api/proposal/pls/${id}`, body, { headers: this.headers })
    }
    sendProposalLeadStatus(body) {
        return axiosInstance.post(baseUrl + `/api/proposal/sendplsemail`, body, { headers: this.headers })
    }

    deleteProposalLeadStatus(id) {
        return axiosInstance.delete(baseUrl + `/api/proposal/pls/${id}`, { headers: this.headers })
    }

    getAllChatsByProposalId(id) {
        return axiosInstance.get(baseUrl + `/api/chatbox?proposal_id=${id}`, { headers: this.headers })
    }

    getAllChatById(id) {
        return axiosInstance.get(baseUrl + `/api/proposal?id=${id}`, { headers: this.headers })
    }

    addChatBox(body) {
        return axiosInstance.post(baseUrl + `/api/chatbox`, body, { headers: this.headers })
    }

    updateChatBox(id, body) {
        return axiosInstance.put(baseUrl + `/api/chatbox/${id}`, body, { headers: this.headers })
    }

    deleteChatbox(id) {
        return axiosInstance.delete(baseUrl + `/api/chatbox/${id}`, { headers: this.headers })
    }


    addChat(body) {
        return axiosInstance.post(baseUrl + `/api/chatbox/chat`, body, { headers: this.headers })
    }

    updateChat(id, body) {
        return axiosInstance.put(baseUrl + `/api/chatbox/chat/${id}`, body, { headers: this.headers })
    }

    deleteChat(id) {
        return axiosInstance.delete(baseUrl + `/api/chatbox/chat/${id}`, { headers: this.headers })
    }

    getForms() {
        return axiosInstance.get(baseUrl + `/api/forms`, { headers: this.headers })
    }

    getFormsByProposol(id) {
        return axiosInstance.get(baseUrl + `/api/forms?proposal_id=${id}`, { headers: this.headers })
    }

    getFormsById(id) {
        return axiosInstance.get(baseUrl + `/api/forms?id=${id}`, { headers: this.headers })
    }

    postForms(body) {
        return axiosInstance.post(baseUrl + `/api/forms`, body, { headers: this.headers })
    }

    updateForms(body, id) {
        return axiosInstance.put(baseUrl + `/api/forms/${id}`, body, { headers: this.headers })
    }

    deleteForms(id) {
        return axiosInstance.delete(baseUrl + `/api/forms/${id}`, { headers: this.headers })
    }

    downloadForms(id, type) {
        return fetch(`${baseUrl}/api/forms/download/${id}?format=${type}`, {
            method: 'GET',
            headers: {
                user_id: localStorage.getItem("userID"),
                token: localStorage.getItem("accessToken")
            }
        })
    }

    //Alert and Notifications

    alertandNotification() {
        return axiosInstance.get(baseUserUrl + `/api/notifications/settings`)
    }
    updatealertandNotification(id, body) {
        return axiosInstance.put(baseUserUrl + `/api/notifications/settings/${id}`, body)
    }





    // getEnquiry() {

    //     return axiosInstance.get(baseUserUrl + `/api/enquiry` , { headers: this.headers })
    // }

    getEnquiry() {

        return axiosInstance.get(baseUserUrl + `/api/unregisteredusers`, { headers: this.headers })
    }

    postEnquiry(body) {

        return axiosInstance.post(baseUserUrl + `/api/enquiry`, body)
    }

    getNotificationsById() {
        return axiosInstance.get(baseUserUrl + `/api/notifications?user_id=${localStorage.getItem("userID")}`, { headers: this.headers })
    }

    updateNotificationsById(body) {
        return axiosInstance.put(baseUserUrl + `/api/notifications/${body.id}`, body, { headers: this.headers })
    }

    markAllReadNotifications(body) {
        let body2 = {
            "ids": body
        }
        return axiosInstance.post(baseUserUrl + `/api/notifications/markallread`, body2, { headers: this.headers })
    }


    //Campaigns
    getCampaignPosts(id) {
        return axiosInstance.get(baseUrl + `/api/campaigns/getPosts/${id}`, { headers: this.headers })
    }
    deleteCampaign(id) {
        return axiosInstance.delete(baseUrl + `/api/campaigns/${id}`, { headers: this.headers })
    }
    publishCampaign(id) {
        return axiosInstance.post(baseUrl + `/api/campaigns/publish/${id}`, { headers: this.headers })
    }
    getMyCampaign(userid) {
        if (userid) {
            return axiosInstance.get(baseUrl + `/api/campaigns?userId=${userid}`, { headers: this.headers })
        } else {
            return axiosInstance.get(baseUrl + `/api/campaigns`, { headers: this.headers })
        }
    }
    getMyCampaignById(id) {
        return axiosInstance.get(baseUrl + `/api/campaigns/${id}`, { headers: this.headers })
    }
    postMyCampaign(body) {
        return axiosInstance.post(baseUrl + `/api/campaigns`, body, { headers: this.headers })
    }
    updateMyCampaign(id, body) {
        return axiosInstance.post(baseUrl + `/api/campaigns`, body, { headers: this.headers })
    }

    //Campaigns Social Status
    getCampaignSocialStatus(id) {
        return axiosInstance.get(baseUrl + `/api/campaigns/getSocialStats/${id}`, { headers: this.headers })
    }

    downloadCampaign(id) {
        return axiosInstance.get(baseUrl + `/api/campaigns/getSocialStats/download-excel/${id}`, { headers: this.headers })
    }


}


export default Apis;