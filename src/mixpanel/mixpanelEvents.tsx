import mixpanel from './mixpanel';

class MixpanelEvents {
  constructor() {
    this.setUserSuperProperties();
  }

  setUserSuperProperties() {
    if (process.env.NODE_ENV == 'production') {
      const userName = localStorage.getItem("name") || '';
      const userEmail = localStorage.getItem("email") || '';
      const userType = localStorage.getItem("role") || '';
      const userOrg = localStorage.getItem("org") || '';
      const userSignedIn = !!localStorage.getItem("role");

      mixpanel.reset();

      if (userEmail) {
        mixpanel.identify(userEmail);
      }

      mixpanel.register({
        PageSource: 'Website',
        LastVisited: new Date().toISOString(),
        UserSignedIn: userSignedIn,
        UserName: userName,
        UserType: userType,
        UserEmail: userEmail,
        UserOrg: userOrg,
        // UserSessionCount: localStorage.getItem("sessionCount") || 0,
      });

      mixpanel.people.set({
        $name: userName,
        $email: userEmail,
        UserType: userType,
        UserOrg: userOrg,
        LastVisited: new Date().toISOString(),
      });
    }
  }

  onLoad(loadTime: any, pageName: any, assetSource?: any, sourceName?: any, priority?: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('OnPageLoad', {
        PageName: pageName,
        PageSource: 'Website',
        LoadTime: loadTime,
        LastVisited: new Date().toISOString(),
        UserSignedIn: !!localStorage.getItem("role"),
        UserName: localStorage.getItem("name") || '',
        UserType: localStorage.getItem("role") || '',
        UserEmail: localStorage.getItem("email") || '',
        UserOrg: localStorage.getItem("org") || '',
        PreviousPage: document.referrer || '',
        AssetSource: assetSource || null,
        SourceName: sourceName || null,
        SourcePosition: priority || null,
      });
    }
  }

  onUnload(pageName: any, timeSpent: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('PageUnload', {
        PageName: pageName,
        TimeSpent: timeSpent,
      });
    }
  }

  onRegComplete(userData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('RegComplete', {
        UserPhone: userData.phone,
        UserSportInterest: userData.sportInterest,
        UserType: userData.type,
        NumberOfAttempts: userData.attempts,
      });
    }
  }

  onAssetFormUsed(assetData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('AssetFormUsed', {
        AssetStatus: assetData.AssetStatus,
        AssetType: assetData.AssetType || null,
        NumberOfAttempts: assetData.NumberOfAttempts,
        PreviousStatus: assetData.PreviousStatus || null,
        LastField: assetData.LastField || '',
        OpportunitiesListed: assetData.OpportunitiesListed,
        OpportunityCount: assetData.OpportunityCount || 0,
      });
    }
  }

  onAssetPublished(assetData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('AssetPublished', {
        AssetName: assetData.AssetName,
        AssetStatus: assetData.AssetStatus,
        AssetID: assetData.AssetID,
        CreatedBy: assetData.CreatedBy,
        EditedBy: assetData.EditedBy,
        SellerName: assetData.SellerName,
        FlipView: assetData.FlipView,
        TimeTaken: assetData.TimeTaken,
        OpportunitiesListed: assetData.OpportunitiesListed,
        OpportunityCount: assetData.OpportunityCount,
        OpportunityNames: assetData.OpportunityNames,
        AssetStatusType: assetData.AssetStatusType,
        AssetType: assetData.AssetType || null
      });
    }
  }

  onSessionEnded(sessionData: any) {
    if (process.env.NODE_ENV == 'production') {
      const sessionStartTime = Number(localStorage.getItem("sessionStartTime") || "0");
      const sessionDuration = performance.now() - sessionStartTime;
      mixpanel.track('SessionEnded', {
        // PagesVisited: sessionData.PagesVisited,
        PreviousPage: document.referrer || '',
        IsSignedIn: sessionData.IsSignedIn,
        sessionEndedDate: new Date(),
        sessionEndedTime: Date.now(),
        // SessionCount: sessionData.SessionCount,
        SessionDuration: sessionDuration
      });
    }
  }

  onTrayUpdated(trayData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('TrayUpdated', {
        TrayName: trayData.TrayName,
        NumberOfAssets: trayData.NumberOfAssets,
        IsNew: trayData.IsNew,
        AssetNames: trayData.AssetNames,
        CreatedBy: trayData.CreatedBy,
        PublishedBy: trayData.PublishedBy,
        PublishedAt: trayData.PublishedAt,
        // FirstPublishDate: trayData.FirstPublishDate,
        PagePosition: trayData.PagePosition || null,
        TrayStatus: (trayData.TrayStatus) ? "Published" : "UnPublished" || null
      });
    }
  }
  onSearchPageLoad(searchData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('SearchPageLoad', {
        PreviousPage: document.referrer || '',
        // FilterValue: searchData.FilterValue
        ...searchData
      });
    }
  }
  onTraySearchPageLoad(searchData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('TraySearchPageLoad', {
        TrayName: searchData.TrayName,
        PreviousPage: document.referrer || '',
        FilterValue: searchData.FilterValue
      });
    }
  }

  onRFPSubmitted(rfpData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('RFPSubmitted', {
        SellerName: rfpData.SellerName,
        RFPID: rfpData.RFPID,
        BuyerName: rfpData.BuyerName,
        AssetName: rfpData.AssetName,
        OpportunityName: rfpData.OpportunityName,
        AssetType: rfpData.AssetType,
        DateSubmitted: rfpData.DateSubmitted,
        // FirstRFP: rfpData.FirstRFP
      });
    }
  }
  onRFPUpdated(rfpUpdateData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('RFPUpdated', {
        SellerName: rfpUpdateData.SellerName,
        RFPID: rfpUpdateData.RFPID,
        BuyerName: rfpUpdateData.BuyerName,
        AssetName: rfpUpdateData.AssetName,
        OpportunityName: rfpUpdateData.OpportunityName,
        AssetType: rfpUpdateData.AssetType,
        DateInitiated: rfpUpdateData.DateInitiated,
        CurrentStage: rfpUpdateData.CurrentStage,
        PreviousStage: rfpUpdateData.PreviousStage,
        ZupotsuUserName: rfpUpdateData.ZupotsuUserName,
        DocumentStatus: rfpUpdateData.DocumentStatus,
        LastUpdated: rfpUpdateData.LastUpdated
      });
    }
  }

  onTrayInteraction(trayData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('TrayInteraction', {
        InteractionType: trayData.InteractionType,
        TrayName: trayData.TrayName
      });
    }
  }

  onSubmitContactForm(contactData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('SubmitContactForm', {
        SourcePage: contactData.SourcePage,
        NatureofRequest: contactData.NatureofRequest
      });
    }
  }

  onLogin(msg:any, userData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track(msg, {
        UserName: userData.UserName,
        UserType: userData.UserType,
        UserEmail: userData.UserEmail,
        UserOrg: userData.UserOrg,
        "Login Error?": userData.logError,
        "Error Reason": userData.logReason
      });
    }
  }

  onForgotPassword(email: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('Forgot Password', {
        "forgot password": true,
        userEmail:email
      });
    }
  }

  onAssetAction(rfpData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('CM_AssetActions ', 
      {
        ActionButtonClicked:"Yes",
        ActionName:rfpData.ActionName,
        AssetName:rfpData.AssetName,
        AssetId:rfpData.AssetId,
      });
    }
  }

  onAssetRejected(rfpData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('Asset_Rejected ',rfpData );
    }
  }

  onViewChange(rfpData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track('CM_View ',{
        ViewChange:rfpData.viewChange,
        ViewName:rfpData.ViewName,
        SortUsed:rfpData.SortUsed,
      } );
    }
  }

  errorHandling(errData: any) {
    if (process.env.NODE_ENV == 'production') {
      mixpanel.track("Error - "+errData.name,{
        Error:'yes',
        ErrorMessage:errData.msg
      } );
    }
  }

}

export default new MixpanelEvents();
