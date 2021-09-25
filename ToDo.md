# 2021/09/20

1. 2d viewer (OK)  
2. 3d viewer (OK)  
3. 3d 管線取代 line (OK)  
4. 針對 `2d Chart` 寫 hiDraw prototype (OK)  
5. edit.hi3d.addObj  寫 hiDraw prototype (先添加到2D，再由fabric json更新到3D) (OK)  
6. grid helper (OK)  
7. group  
8. add spot light icon 控制 (OK)  
9. remove spot light  
10. 使用 transform control的 object change 反向控制 fabric 物件位置  (OK)  
11. transform control切換模式  
12. 添加 `helper`
13. CameraHelper、DirectionalLightHelper、HemisphereLightHelper、PointLightHelper、SpotLightHelper  
14. 將fabric繪的2D圖進行貼皮 (功能 OK，未封裝，圖片下載可能非同步)  
15. 數據資料綁訂  
16. 添加陰影shadow顯示 (ok)  
17. 添加obj模型檔時，重設 2D方塊大小 (https://stackoverflow.com/questions/20864931/three-js-how-can-i-return-the-size-of-an-object)  (OK)  
18. boxhelper
19. GLTF (webgl_animation_skinning_morph.html)
20. fabric 多選 http://fabricjs.com/manage-selection   (hiDraw_Event.js 中 selection:created 的 discardActiveObject)

## bug  

1. 2d viewer can't show video


## note  

1. editor 移除多於物件可能導致`helper`參考線一併被移除，所以先不移除。  

2. Image plane textture (OK)  

3. 添加新屬性改 `hiDraw.prototype.toFabricJson`，還要在對應的 `fabric.HiXXX` 的toObject 添加輸出屬性
