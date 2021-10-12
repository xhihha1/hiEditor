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
11. transform control切換模式 (OK)  
12. 添加 `helper` (OK)
13. CameraHelper、DirectionalLightHelper、HemisphereLightHelper、SpotLightHelper (OK)  
14. 將fabric繪的2D圖進行貼皮 (功能 OK，未封裝，圖片下載可能非同步)  
15. 數據資料綁訂 (OK)  
16. 添加陰影shadow顯示 (ok)  
17. 添加obj模型檔時，重設 2D方塊大小 (https://stackoverflow.com/questions/20864931/three-js-how-can-i-return-the-size-of-an-object)  (OK)  
18. boxhelper (OK)
19. GLTF (webgl_animation_skinning_morph.html) (OK)  
20. fabric 多選 http://fabricjs.com/manage-selection   (hiDraw_Event.js 中 selection:created 的 discardActiveObject) (OK)  
21. copy & paste (OK)  
22. PointLight (OK)
23. transform control無法控制group(obj, 3ds, gltf...etc) (OK)
24. group copy & past (OK)
25. 六面體不同面貼不同圖 (https://opentechlovers.wordpress.com/2014/09/22/wrap-different-images-on-different-faces-of-a-cube/)  
26. 六面體不同面貼不同顏色 (https://discourse.threejs.org/t/changing-face-color-of-cube/26509)  
27. THREE.CanvasTexture(canvas)  
28. 燈光屬性 (OK)  
29. 相機屬性 (OK)  
30. grid屬性 (OK)  
31. fabric renderAll() 改 renderAndResetBound() requestRenderAllBound()  (OK)  
32. 相機延管線移動，參考 editor3d.js animate() https://threejs.org/examples/#webgl_geometry_extrude_splines  
33. 鍵盤操作 misc_controls_pointerlock.html 添加在 viewer (OK)
34. PointLightHelper  
35. 數據資料綁定測試完成，參考refresh3d hiSphere，需要修正 set 驗證 undefined 機制 (OK)  
36. viewer 讀取場景光線等屬性，添加 json 設定同42 (OK)  
37. Image update runtime (https://stackoverflow.com/questions/16066448/three-js-texture-image-update-at-runtime)  
38. Object click event (OK) (https://stackoverflow.com/questions/17638933/three-js-clickable-objects) (https://discourse.threejs.org/t/click-event-on-object/1320)  
39. 在牆面上挖洞門窗 (https://discourse.threejs.org/t/how-to-create-window-and-door-openings-in-the-wall/20473/4)  (https://discourse.threejs.org/t/collection-of-examples-from-discourse-threejs-org/4315)  
40. leaflet map image (https://github.com/mapbox/leaflet-image)  
41. 把所有含 hiId的物件，放在一個列表，方便快速索引。 (XXX失敗) 
42. 把燈光屬性加入到 view，同36 (OK)  
43. 物件添加 animation，類似資料綁定但是由 requestAnimationFrame 執行 (OK)  
43. 整體添加 animation，類似資料綁定但是由 requestAnimationFrame 執行 (OK)  
44. 添加圓柱 https://threejs.org/docs/?q=cylin#api/en/geometries/CylinderGeometry  (OK)  
45. 添加透明material (OK)  
46. 材質
  - (https://www.itread01.com/content/1557943173.html)  
  - (https://ithelp.ithome.com.tw/articles/10204201)  
  - (https://ithelp.ithome.com.tw/articles/10204288)
  - cube (OK)  
  - sphere (OK)  

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
3. 3d polyline 會造成當掉  


## note  

1. editor 移除多於物件可能導致`helper`參考線一併被移除，所以先不移除。  

2. Image plane textture (OK)  

3. 添加新屬性改 `hiDraw.prototype.toFabricJson`，還要在對應的 `fabric.HiXXX` 的toObject 添加輸出屬性

4. `urgent` note，一些不知道為何發生的錯誤

5. 添加新`format`，新增 hi3d_format_XXX.js, hi3d.js, refresh3d.js, 最後在編輯器校正大小修改 editor3d.js

6. [icon](https://www.flaticon.com/free-icon/move-object_14296#)

7. [3D模型](https://free3d.com/3d-models/)  

8. https://www.thingjs.com/guide/platform/

9. 模型拆解爆炸效果 https://www.pianshen.com/article/5966103298/  

10. 使用threejs实现辉光(曝光效果) https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html
    https://threejs.org/examples/webgl_postprocessing_unreal_bloom_selective.html  

11. https://blog.csdn.net/qq_30100043/article/details/78944426

12. 範例 https://hofk.de/main/discourse.threejs/

13. download json (https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser)  

14. 下載模型 https://www.thingiverse.com/thing:34836  

15. Cube environment (three scene equirectangular)



# Texture  

參考:  

  - (https://ithelp.ithome.com.tw/articles/10204201)  
  - (https://ithelp.ithome.com.tw/articles/10204288)
  - 官方設定  https://threejs.org/docs/?q=texture#api/en/constants/Textures

一般顏色預設 `null`，可以同時設定圖跟顏色  

    const material = new THREE.MeshStandardMaterial({
        color: objOption.color,
        transparent: objOption.transparent,
        opacity: objOption.opacity
    });

添加圖片  

    const headMap = new THREE.TextureLoader().load(
        'https://dl.dropboxusercontent.com/s/bkqu0tty04epc46/creeper_face.png'
    )
    cube.material.map = headMap // 可延續原本的顏色
    cube.material.needsUpdate = true;

每個面向設定不同的圖或顏色  

    const skinMap = new THREE.TextureLoader().load(
        'https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png'
    )
    const headMaterials = []
    for (let i = 0; i < 6; i++) {
        let map

        if (i === 4) map = '' // 圖留空會用預設顏色
        else map = skinMap

        headMaterials.push(new THREE.MeshStandardMaterial({ map: map, color: null })) // 顏色也可留空用預設  
    }
    cube.material = headMaterials
    cube.material.needsUpdate = true;

其他數設定  

    const skinMat = new THREE.MeshStandardMaterial({
        roughness: 0.3, // 粗糙度
        metalness: 0.8, // 金屬感
        transparent: true, // 透明與否
        opacity: 0.9, // 透明度
        side: THREE.DoubleSide, // 雙面材質
        map: skinMap // 皮膚貼圖
    })

Wrapping Modes  

    THREE.RepeatWrapping
    THREE.ClampToEdgeWrapping
    THREE.MirroredRepeatWrapping

設定旋轉平移重複  

    const texture = mesh.material.map;
    texture.offset.set( API.offsetX, API.offsetY );
    texture.repeat.set( API.repeatX, API.repeatY );
    texture.center.set( API.centerX, API.centerY );
    texture.rotation = API.rotation; // rotation is around [ 0.5, 0.5 ]

球形貼皮  
參考 webgl_materials_physical_clearcoat  

canvas texture  
webgl_materials_texture_canvas  

reflectivity(反射率)  
webgl_materials_variations_standard  

# 沿著線移動  

webgl_modifier_curve  

閃電特效  
webgl_lightningstrike
