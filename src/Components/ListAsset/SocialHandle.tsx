import { Typography } from '@mui/material';
import ZupotsuAddMore from '../../Molecules/zupotsu-add-more/zupotsu-add-more';
// import ZupotsuTextfield from 'libs/component-lib/src/lib/Atoms/zupotsu-textfields/zupotsu-textfields';
import ZupotsuTextfield from '../Settings/ZupotsuTextfield';
import twitterx from '../../assets/twitterx.png'
import Tiktok from '../../assets/tiktok.svg'
import {
  facebookIcon,
  fb1,
  GlobalB,
  globalEarth,
  Instag,
  instagramI,
  instagramIcon,
  LinkedIn,
  linkedInn,
  ln,
  youtube,
  YoutubeIcon,
} from '../../assets';
import { useCallback, useEffect, useState } from 'react';
import {
  validateFacebookUrl,
  validateInstagramUrl,
  validateLinkedInUrl,
  validateTikTokUrl,
  validateUrl,
  validateXUrl,
  validateYouTubeUrl,
} from '../../utils/validateTextfieldValue';

const SocialHandle = ({
  deviceType,
  formData,
  errors,
  handleInputChange,
  socialLinks,
  onChangeSocial,
  previewMode,
  isEditView = false,
}: any) => {
  const isEmptyObject = (socialLinks: any) => {
    for (const key in socialLinks) {
      if (socialLinks[key]) {
        return false; // If any value is not empty, return false
      }
    }
    return true; // If all values are empty, return true
  };
  const [socialMediaItems, setSocialMediaItems] = useState([
    {
      name: 'Facebook',
      value: 'facebook',
      img: facebookIcon,
      showDefault: true,
      placeHolder: 'Facebook',
      isError: false,
      showInputView: true,
      errorMessage: 'Enter Valid Facebook Url',
    },
    {
      name: 'Instagram',
      value: 'instagram',
      img: instagramIcon,
      showDefault: true,
      placeHolder: 'Instagram',
      isError: false,
      showInputView: true,
      errorMessage: 'Enter Valid Instagram Url',
    },
    // {
    //   name: 'LinkedIn',
    //   value: 'linkedin',
    //   img: LinkedIn,
    //   placeHolder: 'LinkedIn',
    //   isError: false,
    //   showInputView: false,
    //   errorMessage: 'Enter Valid LinkedIn Url',
    // },
    {
      name: 'Website',
      value: 'website',
      img: GlobalB,
      showDefault: true,
      placeHolder: 'Website',
      isError: false,
      showInputView: true,
      errorMessage: 'Enter Valid Website Url',
    },
    {
      name: 'X',
      value: 'x',
      img: twitterx,
      showDefault: true,
      placeHolder: 'X',
      isError: false,
      showInputView: true,
      errorMessage: 'Enter Valid X Url',
    },
    {
      name: 'youtube',
      value: 'youtube',
      img: YoutubeIcon,
      showDefault: true,
      placeHolder: 'Youtube',
      isError: false,
      showInputView: true,
      errorMessage: 'Enter Valid Youtube Url',
    },
    {
      name: 'Blog',
      value: 'blog',
      img: GlobalB,
      placeHolder: 'Blog',
      isError: false,
      showInputView: false,
      errorMessage: 'Enter Valid Blog Url',
    },
    {
      name: 'Tiktok',
      value: 'tiktok',
      img: Tiktok,
      showDefault: true,
      placeHolder: 'Tiktok',
      isError: false,
      showInputView: true,
      errorMessage: 'Enter Valid Tiktok Url',
    },
  ]);

  const handleSocialMediaItemClick = useCallback(
    (clickedItemName: string) => {
      const updatedSocialMediaItems = socialMediaItems?.map((item) =>
        item.name === clickedItemName
          ? { ...item, showInputView: !item.showInputView }
          : item
      );
      setSocialMediaItems(updatedSocialMediaItems);
    },
    [socialMediaItems]
  );

  const updateSocialMediaData = (mediaKey: string, isValid: boolean) => {
    const socialMediaItemsData = [...socialMediaItems];
    const index = socialMediaItemsData.findIndex(
      (data: any) => data?.value === mediaKey
    );
    if (index > -1) {
      socialMediaItemsData[index].isError = !isValid;
    }
    setSocialMediaItems(socialMediaItemsData);
    handleInputChange(socialLinks)
  };

  const validateField = (fieldName: string, errorMessage: string) => {
    switch (fieldName) {
      case 'instagram':
        if (!validateInstagramUrl(socialLinks[fieldName])) {
          if (socialLinks[fieldName]?.trim().length === 0) {
            return true;
          }
          return false;
        }
        return true;
      case 'facebook':
        if (!validateFacebookUrl(socialLinks[fieldName])) {
          if (socialLinks[fieldName]?.trim().length === 0) {
            return true;
          }
          return false;
        }
        return true;
      case 'linkedin':
        if (!validateLinkedInUrl(socialLinks[fieldName])) {
          if (socialLinks[fieldName]?.trim().length === 0) {
            return true;
          }
          return false;
        }
        return true;
      case 'website':
        if (!validateUrl(socialLinks[fieldName])) {
          if (socialLinks[fieldName]?.trim().length === 0) {
            return true;
          }
          return false;
        }
        return true;
      case 'blog':
        if (!validateUrl(socialLinks[fieldName])) {
          if (socialLinks[fieldName]?.trim().length === 0) {
            return true;
          }
          return false;
        }
        return true;
      case 'x':
        if (!validateXUrl(socialLinks[fieldName])) {
          if (socialLinks[fieldName]?.trim().length === 0) {
            return true;
          }
          return false;
        }
        return true;
      case 'youtube':
        if (!validateYouTubeUrl(socialLinks[fieldName])) {
          if (socialLinks[fieldName]?.trim().length === 0) {
            return true;
          }
          return false;
        }
        return true;
      case 'tiktok':
        if (!validateTikTokUrl(socialLinks[fieldName])) {
          if (socialLinks[fieldName]?.trim().length === 0) {
            return true;
          }
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const validateUrls = () => {
    let isFbLinkValid = true;
    let isInstaLinkValid = true;
    let isWebsiteLinkValid = true;
    let isYoutubeValid = true;
    let isXValid = true;
    let isTiktokValid = true;
    // let isLinkedInValid = true;
    let isBlogValid = true;
    Object.keys(socialLinks).forEach((platform) => {
      const url = socialLinks[platform];

      switch (platform) {
        case 'facebook':
          isFbLinkValid = validateField('facebook', 'required');
          updateSocialMediaData(platform, isFbLinkValid);
          break;
        case 'instagram':
          isInstaLinkValid = validateField('instagram', 'required');
          updateSocialMediaData(platform, isInstaLinkValid);
          break;
        case 'website':
          isWebsiteLinkValid = validateField('website', 'required');
          updateSocialMediaData(platform, isWebsiteLinkValid);
          break;
        case 'blog':
          isBlogValid = validateField('blog', 'required');
          updateSocialMediaData(platform, isBlogValid);
          break;
        case 'youtube':
          isYoutubeValid = validateField('youtube', 'required');
          updateSocialMediaData(platform, isYoutubeValid);
          break;
        case 'x':
          isXValid = validateField('x', 'required');
          updateSocialMediaData(platform, isXValid);
          break;
        case 'tiktok':
          isTiktokValid = validateField('tiktok', 'required');
          updateSocialMediaData(platform, isTiktokValid);
          break;
        // case 'linkedin':
        //   isLinkedInValid = validateField('linkedin', 'required');
        //   updateSocialMediaData(platform, isLinkedInValid);
        //   break;
        default:
          break;
      }
    });

    return (
      isFbLinkValid &&
      isInstaLinkValid &&
      isWebsiteLinkValid &&
      isBlogValid
      // &&
      // isLinkedInValid
    );
  };

  useEffect(() => {
    if (socialLinks) {
      validateUrls();
    }
  }, [socialLinks]);

  useEffect(() => {
    if (previewMode || isEditView) {
      const socialmediaData = [...socialMediaItems].map((socialdata) => ({
        ...socialdata,
        showInputView: Object.keys(socialLinks).includes(socialdata.value),
      }));
      setSocialMediaItems(socialmediaData);
    }
  }, [previewMode, socialLinks, isEditView]);

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        // marginBottom:'60px'
      }}>
        <Typography
          sx={{
            color: 'var(--Gray-1, #333)',
            fontFamily: 'Inter',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            marginBottom: deviceType === 'mobile' ? '10px' : '10px',
            marginTop: deviceType === 'mobile' ? '16px' : '20px',
            display: previewMode && isEmptyObject(socialLinks) ? 'none' : 'c',
          }}
        >
          Social Handles
        </Typography>
        <ZupotsuAddMore
          maxWidth={deviceType === 'mobile' ? '100%' : '48%'}
          socialMediaItems={socialMediaItems}
          handleClickEvent={(data) => handleSocialMediaItemClick(data.name)}
          handleTextFieldChange={onChangeSocial}
          values={socialLinks}
          previewMode={previewMode}
          prevFormData={formData}
        />
      </div>
    </>
  );
};

export default SocialHandle;
