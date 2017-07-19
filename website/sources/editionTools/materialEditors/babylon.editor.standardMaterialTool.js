var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    var EDITOR;
    (function (EDITOR) {
        var StandardMaterialTool = (function (_super) {
            __extends(StandardMaterialTool, _super);
            // Public members
            // Private members
            // Protected members
            /**
            * Constructor
            * @param editionTool: edition tool instance
            */
            function StandardMaterialTool(editionTool) {
                var _this = _super.call(this, editionTool, "STANDARD-MATERIAL", "STANDARD", "Std Material") || this;
                // Initialize
                _this.onObjectSupported = function (material) { return material instanceof BABYLON.StandardMaterial; };
                return _this;
            }
            // Update
            StandardMaterialTool.prototype.update = function () {
                if (!_super.prototype.update.call(this))
                    return false;
                this.material.useLogarithmicDepth = this.material.useLogarithmicDepth || false;
                this.material.useEmissiveAsIllumination = this.material.useEmissiveAsIllumination || false;
                this.material.useReflectionFresnelFromSpecular = this.material.useReflectionFresnelFromSpecular || false;
                // Values
                var valuesFolder = this._element.addFolder("Values");
                valuesFolder.add(this.material, "roughness").min(0).step(0.01).name("Roughness");
                // Options
                var optionsFolder = this._element.addFolder("Options");
                optionsFolder.add(this.material, "useLogarithmicDepth").name("Use Logarithmic Depth");
                optionsFolder.add(this.material, "useReflectionFresnelFromSpecular").name("Use Reflection Fresnel From Specular");
                // Diffuse
                var diffuseFolder = this._element.addFolder("Diffuse");
                this.addColorFolder(this.material.diffuseColor, "Diffuse Color", true, diffuseFolder);
                diffuseFolder.add(this.material, "useAlphaFromDiffuseTexture").name("Use Alpha From Diffuse Texture");
                this.addTextureButton("Diffuse Texture", "diffuseTexture", diffuseFolder);
                // Bump
                var bumpFolder = this._element.addFolder("Bump & Parallax");
                bumpFolder.add(this.material, "useParallax").name("Use Parallax");
                bumpFolder.add(this.material, "useParallaxOcclusion").name("Use Parallax Occlusion");
                bumpFolder.add(this.material, "parallaxScaleBias").step(0.001).name("Bias");
                bumpFolder.add(this, "_createNormalMapEditor").name("Create normal map from diffuse texture...");
                this.addTextureButton("Bump Texture", "bumpTexture", bumpFolder);
                // Specular
                var specularFolder = this._element.addFolder("Specular");
                this.addColorFolder(this.material.specularColor, "Specular Color", true, specularFolder);
                specularFolder.add(this.material, "specularPower").min(0).step(0.01).name("Specular Power");
                specularFolder.add(this.material, "useSpecularOverAlpha").name("Use Specular Over Alpha");
                specularFolder.add(this.material, "useGlossinessFromSpecularMapAlpha").name("Use Glossiness From Specular Map Alpha");
                this.addTextureButton("Specular Texture", "specularTexture", specularFolder);
                // Opacity
                var opacityFolder = this.addTextureButton("Opacity Texture", "opacityTexture", null);
                opacityFolder.open();
                // Emissive
                var emissiveFolder = this._element.addFolder("Emissive");
                this.addColorFolder(this.material.emissiveColor, "Emissive Color", true, emissiveFolder);
                emissiveFolder.add(this.material, "useEmissiveAsIllumination").name("Use Emissive As Illumination");
                this.addTextureButton("Emissive Texture", "emissiveTexture", emissiveFolder);
                // Ambient
                var ambientFolder = this._element.addFolder("Ambient");
                this.addColorFolder(this.material.ambientColor, "Ambient Color", true, ambientFolder);
                this.addTextureButton("Ambient Texture", "ambientTexture", ambientFolder);
                // Light Map
                var lightMapFolder = this._element.addFolder("Light Map");
                lightMapFolder.add(this.material, "useLightmapAsShadowmap").name("Use Lightmap As Shadowmap");
                this.addTextureButton("Light Map Texture", "lightmapTexture", lightMapFolder);
                // Reflection
                var reflectionFolder = this._element.addFolder("Reflection");
                this.addTextureButton("Reflection Texture", "reflectionTexture", reflectionFolder, true);
                // Refraction
                var refractionFolder = this._element.addFolder("Refraction");
                refractionFolder.add(this.material, "indexOfRefraction").name("Index of Refraction");
                refractionFolder.add(this.material, "invertRefractionY").name("Invert Y");
                this.addTextureButton("Refraction Texture", "refractionTexture", refractionFolder, true);
                // Functions
                var functionsFolder = this._element.addFolder("Functions");
                // Finish
                return true;
            };
            // Create normal map editor
            StandardMaterialTool.prototype._createNormalMapEditor = function () {
                var _this = this;
                if (!this.material.diffuseTexture || !(this.material.diffuseTexture instanceof BABYLON.Texture))
                    return EDITOR.GUI.GUIWindow.CreateAlert("Please provide a diffuse texture first and/or use only basic texture", "Info");
                var editor = new EDITOR.NormalMapEditor(this._editionTool.core, this.material.diffuseTexture);
                editor.onApply = function (texture) {
                    _this.material.bumpTexture = texture;
                };
            };
            return StandardMaterialTool;
        }(EDITOR.AbstractMaterialTool));
        EDITOR.StandardMaterialTool = StandardMaterialTool;
    })(EDITOR = BABYLON.EDITOR || (BABYLON.EDITOR = {}));
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.editor.standardMaterialTool.js.map
