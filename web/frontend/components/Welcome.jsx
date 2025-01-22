import { InlineGrid, Box, Image, Text, List, Select, Button, Spinner } from '@shopify/polaris';
import { useState, useEffect } from 'react';
import { welcome, English, French, German, Spain, Italian } from "../assets";
import { useTranslation } from "react-i18next";


export default function Welcome({ createPartnerInfo, languageList, loader }) {
    console.log("langugeList", languageList);
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState('en');

   

    const options = languageList && languageList.map((item) => ({
        label: item.name,
        value: item._id,
        prefix: (
            <Image
                source={item.key === 'en' ? English : ((item.key === 'fr') ? French : ((item.key === 'it') ?  Italian : ((item.key === 'es') ? Spain : German)))}
                alt={item.name}
                style={{ height: "16px" }}
            />
        ) 
    }));

    useEffect(() => {
        // Set default language based on `default` flag in languageList
        const defaultLanguage = languageList.find(item => item.default);
        if (defaultLanguage) {
            setSelected(defaultLanguage._id);
        }
    }, [languageList]);

    // Handle language selection change
    const handleLanguageChange = (value) => {
        setSelected(value);
        const selectedLanguage = languageList.find(lang => lang.key === value);
        if (selectedLanguage) {
            setSelected(selectedLanguage.name);
        }
    };

    // Trigger the partner info creation with selected language
    const getStartedAccountEditor = () => {
        console.log("Selected language:", );
        createPartnerInfo(selected);
    };

    return (
        <div style={{ width: "100%", margin: "auto", maxWidth: "1000px" }}>
            <InlineGrid columns={{ "xs": 1, "lg": 2 }}>
                <Box
                    background="bg-surface"
                    as={'div'}
                    borderStartStartRadius="200"
                    borderEndStartRadius="200"
                    padding="400"
                    shadow="200">
                    <Box as={'div'} paddingBlock="200">
                        <Text variant="headingLg" as="h2">{t("Welcome.welcomeText")}</Text>
                    </Box>
                    <Box as={'div'} paddingBlock="025">
                        <Text variant="headingSm" as="p">{t("Welcome.welcomeSubtitle")}</Text>
                    </Box>
                    <Box as={'div'} paddingBlock="200">
                        <Text variant="bodyMd" as="p" fontWeight="regular" tone="subdued">{t("Welcome.welcomeDesc")}</Text>
                    </Box>
                    <Box as={'div'} paddingBlock="100">
                        <Text variant="headingSm" as="p" fontWeight="semibold">{t("Welcome.welcomeListTitle")}</Text>
                    </Box>
                    <Box as={'div'} paddingBlock="200">
                        <List type="bullet">
                            <List.Item>{t("Welcome.welcomeListItem1")}</List.Item>
                            <List.Item>{t("Welcome.welcomeListItem2")}</List.Item>
                            <List.Item>{t("Welcome.welcomeListItem3")}</List.Item>
                            <List.Item>{t("Welcome.welcomeListItem4")}</List.Item>
                        </List>
                    </Box>
                    <Box as={'div'} paddingBlock="050">
                        <Text variant="headingSm" as="p">{t("Welcome.welcomeSubtitle2")}</Text>
                    </Box>
                    <Box as={'div'} paddingBlock="200">
                        <Text variant="headingSm" as="p" fontWeight="regular" tone="subdued">{t("Welcome.welcomeDesc2")}</Text>
                    </Box>
                    <Box as={'div'} paddingBlock="200">
                        <Text variant="headingSm" as="p">{t("Welcome.welcomeLangText")}</Text>
                    </Box>
                    <Box as={'div'} paddingBlock="200">
                        <div className="ac-language-wrap">
                            <Select
                                options={options}
                                onChange={handleLanguageChange}
                                value={selected}
                            />
                        </div>
                    </Box>
                </Box>
                <Box as={'div'} shadow="200">
                    <Image source={welcome} alt="welcome" style={{ height: "100%", width: "100%" }} />
                </Box>
            </InlineGrid>
            <InlineGrid columns={1}>
                <div style={{ width: "100%", margin: "auto", maxWidth: "1000px" }}>
                    <Box as={'div'} paddingBlock="400">
                        {
                            !loader ? <Button variant="primary" onClick={getStartedAccountEditor}>{t("Welcome.welcomeButtonText")}</Button> : <Spinner size="small" />
                        }
                    </Box>
                </div>
            </InlineGrid>
        </div>
    );
}