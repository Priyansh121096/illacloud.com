import { SidebarLayout } from '@/layouts/SidebarLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Title } from '@/components/Title'
import { ILLADocumentationNav } from '@/navs/documentation'
import { locales } from '@/constants/language'

export function DocumentationLayout (props) {
  let router = useRouter()
  return (
    <>
      <Title suffix={router.pathname === '/' ? undefined : 'ILLA'}>
        {props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}
      </Title>
      <DocumentationHeader meta={props.layoutProps.meta} />
      <SidebarLayout nav={ILLADocumentationNav(router.locale)} {...props} />
    </>
  )
}

export function DocumentationHeader (props) {
  let router = useRouter()

  const canonicalData = router.locale !== 'en-US' ? `/${router.locale}` : ''

  const { meta } = props
  return (
    <Head>
      <meta
        key="og:url"
        property="og:url"
        content={`https://illacloud.com${router.pathname}`}
      />
      <meta key="og:type" property="og:type" content="article" />
      <meta
        key="og:title"
        property="og:title"
        content={`${meta.metaTitle || meta.title} – ILLA`}
      />
      <meta
        key="og:image"
        name="og:image"
        property="og:image"
        content={`${meta.image ??
          `https://cdn.illacloud.com/official-website/img/illa_logo.png`
          }`}
      />
      <meta
        key="og:description"
        name="og:description"
        property="og:description"
        content={meta.desc}
      />

      <meta
        key="image"
        name="image"
        content={`${meta.image ??
          `https://cdn.illacloud.com/official-website/img/illa_logo.png`
          }`}
      />

      <meta name="description" content={meta.desc}></meta>
      {meta.keywords ? (
        <meta name="keywords" content={meta.keywords?.toString()}></meta>
      ) : null}

      <meta name="twitter:site" content="@illaCloud" />
      <meta name="twitter:creator" content="@illaCloud" />
      <meta
        name="twitter:title"
        content={`${meta.metaTitle || meta.title} – ILLA`}
      />
      <meta
        name="twitter:description"
        content={meta.desc}
      />
      {meta.image ? (
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content={meta.image}
          />
        </>
      ) : (
        <>
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:image"
            content={`https://cdn.illacloud.com/official-website/img/illa_logo.png`}
          />
        </>
      )}
      <link
        rel="canonical"
        href={`https://www.illacloud.com${canonicalData}${router.asPath}`}
      />
      {
        locales.filter((item) => item !== router.locale).map((locale) => (
          <link
            key={locale}
            rel="alternate"
            href={`https://www.illacloud.com/${locale}${router.asPath}`}
            hrefLang={locale}
          />
        ))
      }
      <link
        rel="alternate"
        href={`https://www.illacloud.com${router.asPath}`}
        hrefLang='en-US'
      />
    </Head>
  )
}

DocumentationLayout.nav = ILLADocumentationNav()
