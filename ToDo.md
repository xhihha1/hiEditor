# 2021/09/20

1. 2d viewer (OK)  
2. 3d viewer (OK)  
3. 3d 管線取代 line (OK)  
4. 針對 `2d Chart` 寫 hiDraw prototype (OK)  
5. edit.hi3d.addObj  寫 hiDraw prototype (先添加到2D，再由fabric json更新到3D) (OK)  
6. grid helper (OK)  
7. group (http://fabricjs.com/manage-selection) (OK)   
8. add spot light icon 控制 (OK)  
9. remove spot light (OK)  
10. 使用 transform control的 object change 反向控制 fabric 物件位置  (OK)  
11. transform control切換模式  
12. 添加 `helper` (OK)
13. CameraHelper、DirectionalLightHelper、HemisphereLightHelper、SpotLightHelper (OK)  
14. 將fabric繪的2D圖進行貼皮 (功能 OK，未封裝，圖片下載可能非同步)  
15. 數據資料綁訂  
16. 添加陰影shadow顯示 (ok)  
17. 添加obj模型檔時，重設 2D方塊大小 (https://stackoverflow.com/questions/20864931/three-js-how-can-i-return-the-size-of-an-object)  (OK)  
18. boxhelper (OK)
19. GLTF (webgl_animation_skinning_morph.html) (OK)  
20. fabric 多選 http://fabricjs.com/manage-selection   (hiDraw_Event.js 中 selection:created 的 discardActiveObject) (OK)  
21. copy & paste (OK)  
22. PointLight & PointLightHelper
23. transform control無法控制group(obj, 3ds, gltf...etc)
24. group copy & past
25. 六面體不同面貼不同圖 (https://opentechlovers.wordpress.com/2014/09/22/wrap-different-images-on-different-faces-of-a-cube/)  
26. 六面體不同面貼不同顏色 (https://discourse.threejs.org/t/changing-face-color-of-cube/26509)  
27. THREE.CanvasTexture(canvas)  

# group (OK)  
fabric  
1. group object (http://fabricjs.com/manage-selection)  

Three  
1. meshA.clone() 複製 cloneA 要放進 group 物件
2. 產生three group
3. const group = new THREE.Group();
4. group.add( cloneA );
5. scene.add( group );
6. scene.remove(meshA)
7. 修改 refresh3d.js 需要 loop group children 進行增減

`ungroup`:[ungroup](https://discourse.threejs.org/t/ungroup-without-removing/1912/2)  

## bug  

1. 2d viewer can't show video  
2. copy past 時，3D物件位置會跑掉  


## note  

1. editor 移除多於物件可能導致`helper`參考線一併被移除，所以先不移除。  

2. Image plane textture (OK)  

3. 添加新屬性改 `hiDraw.prototype.toFabricJson`，還要在對應的 `fabric.HiXXX` 的toObject 添加輸出屬性

4. `urgent` note，一些不知道為何發生的錯誤

5. 添加新`format`，新增 hi3d_format_XXX.js, hi3d.js, refresh3d.js, 最後在編輯器校正大小修改 editor3d.js
