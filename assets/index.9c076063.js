const d=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function u(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=u(e);fetch(e.href,r)}};d();let o=null;const a=document.querySelector("header"),f=document.querySelector(".coffee_name"),l=document.querySelector(".filling"),m=document.querySelectorAll(".coffee-category-button"),g=document.querySelector(".coffee-add-area form"),s=document.querySelector(".modal-layout");a.addEventListener("click",t=>{!t.target.matches('[type="radio"]')||(t.preventDefault(),alert("\uC544\uC9C1 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uB124\uC694\u{1F97A}"))});m.forEach(t=>t.addEventListener("click",()=>{o&&(o.classList.remove("selected"),l.classList.remove(o.id)),o=t,l.classList.add(o.id),o.classList.add("selected"),f.innerText=t.innerText}));g.addEventListener("submit",t=>{t.preventDefault(),s.classList.toggle("hidden")});s.addEventListener("click",t=>{!t.target.matches("#close-icon")||s.classList.toggle("hidden")});
