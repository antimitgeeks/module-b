import {
  Card,
  Spinner,
  Page,
  Layout,
  TextContainer,
  Image,
  // Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import Welcome from "../components/Welcome";
import APIServicess from '../services/APIServices';
import { useLocation } from 'react-router-dom';
import { trophyImage } from "../assets";
import { ProductsCard } from "../components"; 
import { useEffect, useState } from "react";
import { trusted } from "mongoose";
const APIServ = new APIServicess();

export default function HomePage() {
  const [languageList, setLanguageList] = useState([]);
  const location = useLocation();
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [loader,setLoader] = useState(true);
  const [shopUrl, setShopUrl] = useState('');

  // Load data when the search query in the URL changes.
  useEffect(() => {
    console.log('location.search', location.search);
    
    getShopUrl();

  }, [location.search]);
 
  // Get shop URL from query parameters and handle related actions
  const getShopUrl = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const shopUrl = searchParams.get('shop');
      setShopUrl(shopUrl)
      if (!shopUrl) {
        console.warn('Shop parameter is missing from the URL');
        return;
      }
      // setShopUrl(shopUrl);
      await Promise.all([
        getPartnerInfo(shopUrl),
        languageListInfo(),
      ]);
    } catch (error) {
      console.error('Error retrieving shop URL:', error);
    }
  };
  const getPartnerInfo = async (shop) => {
   
      const resp = await APIServ.getPartnerInfoData();
      
      if(resp?.status && resp?.result){
        setLoader(false)
        setWelcomeScreen(false)
      }
      else{
        setLoader(false)

        setWelcomeScreen(true)

      }

    
    }
  const { t, i18n } = useTranslation();
  

  const languageListInfo = async () => {
    try {
      const reqBody = { limit: 10, offset: 0 };
      const resp = await APIServ.languageList(reqBody);
      console.log("language list---",resp);
      if (resp?.status) {
        setLanguageList(resp?.data);
      }
    } catch (error) {
      console.error('Error fetching language list:', error?.response || error);
    }
  };

  const createPartnerInfo = async (selected) => {
    try {
      const resp = await APIServ.createPartnerInfoData();
      if (resp?.status) {
        const data = { languageId: selected };
        // setWelcomeScreen(false)
        const languageresp = await APIServ.languageUpdate(data);
        if (languageresp?.status) {
          await getPartnerInfo(shopUrl);
          // await handleFillterStats(null, null, 'today');
          // setWelcomeScreen(false);

          const storeName = shopUrl.replace(".myshopify.com", "");
          const welcomeTitle = t("HomePage.welcomeText");
          let name = resp?.result?.shopJson?.name ? resp?.result?.shopJson?.name : storeName;
          // setWelcomeText(welcomeTitle.replace("`user`", `${name}!`));
        }
      }
    } catch (error) {
      // setLoader(false);
      console.error('Error creating partner info:', error?.response || error);
    } finally {
      // setLoader(false);
    }
  };
  // const { t } = useTranslation();
if(loader){
  return (<Spinner></Spinner>)
}

  return (

    <Page fullWidth>
      {
      welcomeScreen ? 
         <Welcome createPartnerInfo={createPartnerInfo} languageList={languageList}  loader={loader} /> 
      :
        <div style={{ width: "100%", margin: "auto", maxWidth: "950px" }}>Hello {shopUrl}</div>
}
    </Page>
  );  
}