# Next.js Meta - "head" Tags - Re-using Components & Logic

## Head Component

<i>import Head from 'next/head'</i>

Специальный компонент, который позволяет кастомизировать HTML-элемент "head".
Принимает "children" - которые будут обычными HTML-элементами, как и в класическом
теге "head".
По типу, "title", "meta", etc.

## Re-using Head Component

Мы по прежнему можем добавить его в файл \_app.tsx, чтобы этот тег
отображался на всех наших страницах, с какой-либо общей информацией.
При этом если нам нужно будет переопределить его на какой-либо
странице, мы также легко это можем сделать, просто включив его в нужной
нам странице.
То что можно смержить Next смержит, а конфликты решит самостоятельно,
включая последний тэг указанный в тэге Head.

## Optimizing Images Image Component from Next

<i>import Image from 'next/image'</i>

Next предоставляет нам Image Component.
Который оптимизирует размер изображений автоматически, кэширует их.
Принимает такие же атрибуты как и классический "img", а также в обязательном
порядке необходимо указать "width" & "height".