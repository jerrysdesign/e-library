# E-Library

浩鑫股份有限公司為完善教育市場開發的網頁版教育軟體

## Overview

---

## Quick start



---

## Getting Sass(y) with Compass

使用的強大的 [Sass](http://Sass-lang.com) 透過 [Compass](http://compass-style.org) 來創建靈活的樣式，未來可併入到其它專案，重複使用。

---

## Css set-up

按特定資料結構，依照不同的使用目的，拆分多個SASS文件。 

注意：如果檔名以下底線開頭，則該檔案將不會編譯成自己的css文件。 因為檔案使用下底線是被認定做為 Include 使用。

---

### screen.sass

此文件包含了大部分的樣式，以及匯集其他 partial 的樣式表成一個CSS文件。

---

### settings.sass

此文件包含你需要 import 入的 Compass Library。

---

### reset.scss

此文件包含一個簡單的HTML元素 reset。

---

### setting

此文件包含了網站中所有變數。例如顏色，斷點和字體大小...。此文件是定義你的核心佈署，並利用 Compass 中 baseline 與 sont-size 的措施。

---

### mixins.sass

此文件包含任何用 Mixins Project（自己寫的或別人寫的）。

---

### typography.sass

此文件包含了網站的核心排版。它依賴於建立在 settings.scss 文件中的變數。如果不希望使用 Compass 的 rhythm method。

---

### module-typeset.sass


此文件包含你的文字排版 rhythm 風格變數基礎。
它允許每一個元素的class控制一種文字排版風格，風格與內容分離的精細控制。
此外，您可以使用或創建更多的 'typeset' 的父 class，用來設定您網站的特定區域，在那裡沒有過多樣式標題與清單、全域、復寫，你可以精確控制文字內容的一種方式。

---

### forms.sass

此文件包含預設的表單元素和標準造型。

---

### grid.sass

此文件包含網格系統的主要功能。

---

...待
