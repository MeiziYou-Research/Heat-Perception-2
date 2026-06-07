console.log("Thermal Voices MVP v21 loaded.");

mapboxgl.accessToken = "pk.eyJ1IjoianYyeW0iLCJhIjoiY21oNDRrdTdzMGdrczJvcTAxeDZjMG4zdiJ9.SxckX6zT2_bvKPL4jdDTSQ";

const CITY_DATA = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"city_id": "united_states_arlington", "city_name": "Arlington", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 11.7, "Surprise": 23.1, "Neutral": 19.2, "Sadness": 25.4, "Fear": 6.0, "Disgust": 3.6, "Anger": 10.9, "Exposure_a": 76.2, "Health_imp": 6.4, "Vulnerabil": 17.4, "Exposure": 76.2, "Health": 6.4, "Systems": 17.4, "E11": 41.1053540587, "E12": 2.93609671848, "E21": 0.172711571675, "E22": 0.345423143351, "E23": 6.21761658031, "E24": 2.59067357513, "E25": 0.518134715026, "E31": 16.9257340242, "E32": 3.62694300518, "E33": 1.72711571675, "H11": 0.863557858377, "H12": 0.172711571675, "H21": 1.72711571675, "H22": 0.172711571675, "H31": 0.0, "H41": 3.45423143351, "V11": 0.172711571675, "V21": 0.690846286701, "V22": 1.20898100173, "V31": 0.0, "V41": 6.04490500864, "V42": 0.0, "V43": 6.04490500864, "V44": 3.28151986183}, "geometry": {"type": "Point", "coordinates": [-97.04667, 32.69861]}}, {"type": "Feature", "properties": {"city_id": "united_states_atlanta", "city_name": "Atlanta", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 10.8, "Surprise": 20.8, "Neutral": 17.0, "Sadness": 28.7, "Fear": 3.3, "Disgust": 3.6, "Anger": 15.7, "Exposure_a": 86.6, "Health_imp": 5.6, "Vulnerabil": 7.8, "Exposure": 86.6, "Health": 5.6, "Systems": 7.8, "E11": 46.8644067797, "E12": 3.38983050847, "E21": 0.593220338983, "E22": 0.762711864407, "E23": 2.03389830508, "E24": 4.49152542373, "E25": 0.847457627119, "E31": 22.3728813559, "E32": 2.62711864407, "E33": 2.62711864407, "H11": 0.169491525424, "H12": 0.423728813559, "H21": 1.52542372881, "H22": 0.0, "H31": 0.0847457627119, "H41": 3.38983050847, "V11": 0.677966101695, "V21": 0.847457627119, "V22": 0.0, "V31": 0.0, "V41": 1.77966101695, "V42": 0.169491525424, "V43": 2.54237288136, "V44": 1.77966101695}, "geometry": {"type": "Point", "coordinates": [-84.52464, 33.77759]}}, {"type": "Feature", "properties": {"city_id": "united_states_austin", "city_name": "Austin", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 13.4, "Surprise": 21.1, "Neutral": 21.7, "Sadness": 23.3, "Fear": 4.6, "Disgust": 3.7, "Anger": 12.3, "Exposure_a": 79.2, "Health_imp": 6.8, "Vulnerabil": 14.0, "Exposure": 79.2, "Health": 6.8, "Systems": 14.0, "E11": 41.8238993711, "E12": 2.98742138365, "E21": 0.62893081761, "E22": 0.864779874214, "E23": 1.80817610063, "E24": 6.2893081761, "E25": 1.17924528302, "E31": 17.2955974843, "E32": 3.45911949686, "E33": 2.90880503145, "H11": 0.0786163522013, "H12": 0.707547169811, "H21": 2.04402515723, "H22": 0.0786163522013, "H31": 0.786163522013, "H41": 3.06603773585, "V11": 0.314465408805, "V21": 1.57232704403, "V22": 0.62893081761, "V31": 0.314465408805, "V41": 2.35849056604, "V42": 0.0, "V43": 4.63836477987, "V44": 4.16666666667}, "geometry": {"type": "Point", "coordinates": [-97.720145, 30.251955]}}, {"type": "Feature", "properties": {"city_id": "united_states_baltimore", "city_name": "Baltimore", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 16.4, "Surprise": 18.5, "Neutral": 18.7, "Sadness": 24.4, "Fear": 3.7, "Disgust": 2.9, "Anger": 15.4, "Exposure_a": 83.4, "Health_imp": 6.0, "Vulnerabil": 10.5, "Exposure": 83.4, "Health": 6.0, "Systems": 10.5, "E11": 40.350877193, "E12": 9.55165692008, "E21": 0.389863547758, "E22": 1.16959064327, "E23": 3.50877192982, "E24": 5.06822612086, "E25": 1.16959064327, "E31": 18.7134502924, "E32": 1.55945419103, "E33": 1.94931773879, "H11": 0.0, "H12": 0.0, "H21": 1.16959064327, "H22": 0.0, "H31": 0.194931773879, "H41": 4.6783625731, "V11": 0.974658869396, "V21": 1.36452241715, "V22": 0.0, "V31": 0.584795321637, "V41": 2.33918128655, "V42": 0.0, "V43": 3.50877192982, "V44": 1.75438596491}, "geometry": {"type": "Point", "coordinates": [-76.57, 39.27]}}, {"type": "Feature", "properties": {"city_id": "united_kingdom_birmingham", "city_name": "Birmingham", "country": "United Kingdom", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 16.0, "Surprise": 20.1, "Neutral": 23.1, "Sadness": 18.8, "Fear": 8.2, "Disgust": 3.5, "Anger": 10.3, "Exposure_a": 70.7, "Health_imp": 9.5, "Vulnerabil": 19.8, "Exposure": 70.7, "Health": 9.5, "Systems": 19.8, "E11": 30.3153611394, "E12": 1.32248219736, "E21": 2.44150559512, "E22": 2.33977619532, "E23": 4.98474059003, "E24": 3.25534079349, "E25": 0.203458799593, "E31": 19.6337741607, "E32": 3.0518819939, "E33": 3.15361139369, "H11": 0.30518819939, "H12": 0.813835198372, "H21": 2.74669379451, "H22": 0.203458799593, "H31": 0.0, "H41": 5.39165818922, "V11": 0.30518819939, "V21": 0.915564598169, "V22": 0.0, "V31": 0.30518819939, "V41": 3.25534079349, "V42": 0.203458799593, "V43": 4.37436419125, "V44": 10.478128179}, "geometry": {"type": "Point", "coordinates": [-1.748028, 52.453856]}}, {"type": "Feature", "properties": {"city_id": "united_states_birmingham", "city_name": "Birmingham", "country": "United States", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 15.1, "Surprise": 13.5, "Neutral": 24.6, "Sadness": 24.6, "Fear": 6.3, "Disgust": 2.4, "Anger": 13.5, "Exposure_a": 82.5, "Health_imp": 4.8, "Vulnerabil": 12.7, "Exposure": 82.5, "Health": 4.8, "Systems": 12.7, "E11": 34.126984127, "E12": 0.793650793651, "E21": 2.38095238095, "E22": 0.793650793651, "E23": 0.793650793651, "E24": 5.55555555556, "E25": 2.38095238095, "E31": 30.9523809524, "E32": 3.1746031746, "E33": 1.5873015873, "H11": 0.0, "H12": 0.793650793651, "H21": 0.0, "H22": 0.0, "H31": 0.793650793651, "H41": 3.1746031746, "V11": 1.5873015873, "V21": 1.5873015873, "V22": 0.0, "V31": 0.0, "V41": 2.38095238095, "V42": 0.0, "V43": 7.14285714286, "V44": 0.0}, "geometry": {"type": "Point", "coordinates": [-86.7449, 33.56545]}}, {"type": "Feature", "properties": {"city_id": "united_states_boston", "city_name": "Boston", "country": "United States", "dominant_emotion": "Joy", "dominant_attention": "Exposure & lived experience", "Joy": 25.1, "Surprise": 18.2, "Neutral": 17.8, "Sadness": 20.9, "Fear": 6.4, "Disgust": 2.5, "Anger": 9.0, "Exposure_a": 80.3, "Health_imp": 8.4, "Vulnerabil": 11.3, "Exposure": 80.3, "Health": 8.4, "Systems": 11.3, "E11": 38.3663366337, "E12": 3.58910891089, "E21": 0.247524752475, "E22": 1.60891089109, "E23": 2.84653465347, "E24": 5.44554455446, "E25": 0.371287128713, "E31": 21.5346534653, "E32": 3.58910891089, "E33": 2.72277227723, "H11": 0.123762376238, "H12": 0.742574257426, "H21": 2.35148514851, "H22": 0.371287128713, "H31": 0.247524752475, "H41": 4.57920792079, "V11": 0.0, "V21": 0.742574257426, "V22": 0.49504950495, "V31": 0.0, "V41": 2.22772277228, "V42": 0.0, "V43": 3.21782178218, "V44": 4.57920792079}, "geometry": {"type": "Point", "coordinates": [-71.029875, 42.355285]}}, {"type": "Feature", "properties": {"city_id": "australia_brisbane", "city_name": "Brisbane", "country": "Australia", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 17.3, "Surprise": 23.2, "Neutral": 25.3, "Sadness": 16.0, "Fear": 4.2, "Disgust": 6.3, "Anger": 7.6, "Exposure_a": 71.3, "Health_imp": 5.5, "Vulnerabil": 23.2, "Exposure": 71.3, "Health": 5.5, "Systems": 23.2, "E11": 34.5991561181, "E12": 7.17299578059, "E21": 1.68776371308, "E22": 0.42194092827, "E23": 0.42194092827, "E24": 5.06329113924, "E25": 0.0, "E31": 14.7679324895, "E32": 2.95358649789, "E33": 4.2194092827, "H11": 0.42194092827, "H12": 0.0, "H21": 2.53164556962, "H22": 0.0, "H31": 0.42194092827, "H41": 2.10970464135, "V11": 0.0, "V21": 0.0, "V22": 0.0, "V31": 0.0, "V41": 9.28270042194, "V42": 0.0, "V43": 9.70464135021, "V44": 4.2194092827}, "geometry": {"type": "Point", "coordinates": [153.0333333, -27.4833333]}}, {"type": "Feature", "properties": {"city_id": "united_kingdom_bristol", "city_name": "Bristol", "country": "United Kingdom", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 15.2, "Surprise": 21.7, "Neutral": 17.0, "Sadness": 23.3, "Fear": 8.5, "Disgust": 3.7, "Anger": 10.7, "Exposure_a": 68.7, "Health_imp": 8.7, "Vulnerabil": 22.6, "Exposure": 68.7, "Health": 8.7, "Systems": 22.6, "E11": 33.2608695652, "E12": 2.17391304348, "E21": 3.26086956522, "E22": 1.52173913043, "E23": 1.73913043478, "E24": 4.13043478261, "E25": 0.652173913043, "E31": 14.5652173913, "E32": 4.5652173913, "E33": 2.82608695652, "H11": 0.652173913043, "H12": 0.869565217391, "H21": 2.60869565217, "H22": 0.217391304348, "H31": 0.217391304348, "H41": 4.13043478261, "V11": 0.652173913043, "V21": 1.30434782609, "V22": 0.0, "V31": 0.0, "V41": 3.04347826087, "V42": 0.0, "V43": 3.69565217391, "V44": 13.9130434783}, "geometry": {"type": "Point", "coordinates": [-2.719089, 51.382669]}}, {"type": "Feature", "properties": {"city_id": "canada_calgary", "city_name": "Calgary", "country": "Canada", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 22.2, "Surprise": 16.9, "Neutral": 25.3, "Sadness": 20.2, "Fear": 6.3, "Disgust": 2.0, "Anger": 7.1, "Exposure_a": 72.7, "Health_imp": 7.3, "Vulnerabil": 19.9, "Exposure": 72.7, "Health": 7.3, "Systems": 19.9, "E11": 38.1313131313, "E12": 1.51515151515, "E21": 1.51515151515, "E22": 1.76767676768, "E23": 1.76767676768, "E24": 2.52525252525, "E25": 0.505050505051, "E31": 18.1818181818, "E32": 3.53535353535, "E33": 3.28282828283, "H11": 0.0, "H12": 1.26262626263, "H21": 1.51515151515, "H22": 0.0, "H31": 0.252525252525, "H41": 4.29292929293, "V11": 0.0, "V21": 1.0101010101, "V22": 0.0, "V31": 0.0, "V41": 4.79797979798, "V42": 0.0, "V43": 8.83838383838, "V44": 5.30303030303}, "geometry": {"type": "Point", "coordinates": [-114.010139, 51.106944]}}, {"type": "Feature", "properties": {"city_id": "united_states_charlotte", "city_name": "Charlotte", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 13.9, "Surprise": 21.9, "Neutral": 18.5, "Sadness": 24.9, "Fear": 5.2, "Disgust": 2.7, "Anger": 12.9, "Exposure_a": 83.2, "Health_imp": 6.0, "Vulnerabil": 10.8, "Exposure": 83.2, "Health": 6.0, "Systems": 10.8, "E11": 46.8652037618, "E12": 5.79937304075, "E21": 0.626959247649, "E22": 1.09717868339, "E23": 2.5078369906, "E24": 5.1724137931, "E25": 0.783699059561, "E31": 13.7931034483, "E32": 2.82131661442, "E33": 3.76175548589, "H11": 0.313479623824, "H12": 0.0, "H21": 1.41065830721, "H22": 0.470219435737, "H31": 0.313479623824, "H41": 3.44827586207, "V11": 0.156739811912, "V21": 0.313479623824, "V22": 0.156739811912, "V31": 0.0, "V41": 1.56739811912, "V42": 0.0, "V43": 6.89655172414, "V44": 1.72413793103}, "geometry": {"type": "Point", "coordinates": [-80.95433, 35.22254]}}, {"type": "Feature", "properties": {"city_id": "united_states_chicago", "city_name": "Chicago", "country": "United States", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 18.7, "Surprise": 22.1, "Neutral": 20.3, "Sadness": 19.7, "Fear": 4.3, "Disgust": 3.5, "Anger": 11.4, "Exposure_a": 85.6, "Health_imp": 5.6, "Vulnerabil": 8.8, "Exposure": 85.6, "Health": 5.6, "Systems": 8.8, "E11": 45.1646628332, "E12": 3.39780449556, "E21": 0.365917407214, "E22": 0.888656560376, "E23": 1.88186095139, "E24": 5.07056978568, "E25": 1.04547830633, "E31": 21.5368531103, "E32": 3.76372190277, "E33": 2.45687401986, "H11": 0.261369576581, "H12": 0.313643491898, "H21": 1.98640878202, "H22": 0.209095661265, "H31": 0.209095661265, "H41": 2.66596968113, "V11": 0.470465237846, "V21": 0.575013068479, "V22": 0.209095661265, "V31": 0.313643491898, "V41": 1.72503920544, "V42": 0.0, "V43": 2.77051751176, "V44": 2.71824359645}, "geometry": {"type": "Point", "coordinates": [-87.68207, 41.82006]}}, {"type": "Feature", "properties": {"city_id": "united_states_columbus", "city_name": "Columbus", "country": "United States", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 13.3, "Surprise": 16.7, "Neutral": 24.7, "Sadness": 22.4, "Fear": 8.3, "Disgust": 3.6, "Anger": 11.0, "Exposure_a": 73.6, "Health_imp": 6.3, "Vulnerabil": 20.2, "Exposure": 73.6, "Health": 6.3, "Systems": 20.2, "E11": 35.6807511737, "E12": 5.00782472613, "E21": 0.469483568075, "E22": 0.782472613459, "E23": 3.91236306729, "E24": 5.00782472613, "E25": 0.782472613459, "E31": 16.9014084507, "E32": 2.34741784038, "E33": 2.66040688576, "H11": 0.0, "H12": 0.156494522692, "H21": 2.81690140845, "H22": 0.0, "H31": 0.312989045383, "H41": 2.97339593114, "V11": 0.93896713615, "V21": 3.91236306729, "V22": 0.469483568075, "V31": 0.0, "V41": 7.19874804382, "V42": 0.93896713615, "V43": 4.69483568075, "V44": 2.03442879499}, "geometry": {"type": "Point", "coordinates": [-82.87703, 39.99068]}}, {"type": "Feature", "properties": {"city_id": "united_states_dallas", "city_name": "Dallas", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 12.8, "Surprise": 21.7, "Neutral": 17.7, "Sadness": 24.9, "Fear": 3.6, "Disgust": 4.1, "Anger": 15.2, "Exposure_a": 84.6, "Health_imp": 7.2, "Vulnerabil": 8.2, "Exposure": 84.6, "Health": 7.2, "Systems": 8.2, "E11": 47.2660996355, "E12": 1.21506682868, "E21": 0.607533414338, "E22": 0.303766707169, "E23": 2.67314702309, "E24": 5.46780072904, "E25": 0.607533414338, "E31": 20.7168894289, "E32": 3.21992709599, "E33": 2.49088699878, "H11": 0.243013365735, "H12": 0.364520048603, "H21": 2.91616038882, "H22": 0.0607533414338, "H31": 0.243013365735, "H41": 3.40218712029, "V11": 0.243013365735, "V21": 1.21506682868, "V22": 0.243013365735, "V31": 0.0607533414338, "V41": 1.27582017011, "V42": 0.0, "V43": 3.40218712029, "V44": 1.76184690158}, "geometry": {"type": "Point", "coordinates": [-96.83583, 32.83839]}}, {"type": "Feature", "properties": {"city_id": "united_states_denver", "city_name": "Denver", "country": "United States", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 18.1, "Surprise": 26.2, "Neutral": 21.8, "Sadness": 16.1, "Fear": 2.9, "Disgust": 3.4, "Anger": 11.4, "Exposure_a": 84.7, "Health_imp": 3.9, "Vulnerabil": 11.4, "Exposure": 84.7, "Health": 3.9, "Systems": 11.4, "E11": 50.9272467903, "E12": 1.99714693295, "E21": 0.142653352354, "E22": 1.56918687589, "E23": 1.56918687589, "E24": 4.85021398003, "E25": 1.14122681883, "E31": 14.122681883, "E32": 4.42225392297, "E33": 3.99429386591, "H11": 0.427960057061, "H12": 0.427960057061, "H21": 1.8544935806, "H22": 0.142653352354, "H31": 0.0, "H41": 0.998573466476, "V11": 0.570613409415, "V21": 1.8544935806, "V22": 0.142653352354, "V31": 0.0, "V41": 2.85306704708, "V42": 0.0, "V43": 3.28102710414, "V44": 2.71041369472}, "geometry": {"type": "Point", "coordinates": [-104.75, 39.71667]}}, {"type": "Feature", "properties": {"city_id": "canada_edmonton", "city_name": "Edmonton", "country": "Canada", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 22.0, "Surprise": 24.6, "Neutral": 21.3, "Sadness": 19.3, "Fear": 6.6, "Disgust": 0.7, "Anger": 5.6, "Exposure_a": 75.1, "Health_imp": 7.2, "Vulnerabil": 17.7, "Exposure": 75.1, "Health": 7.2, "Systems": 17.7, "E11": 34.7540983607, "E12": 2.62295081967, "E21": 0.327868852459, "E22": 1.96721311475, "E23": 2.29508196721, "E24": 3.60655737705, "E25": 0.327868852459, "E31": 19.3442622951, "E32": 5.24590163934, "E33": 4.59016393443, "H11": 0.655737704918, "H12": 0.655737704918, "H21": 0.983606557377, "H22": 0.0, "H31": 0.0, "H41": 4.91803278689, "V11": 0.327868852459, "V21": 3.27868852459, "V22": 0.0, "V31": 0.0, "V41": 3.93442622951, "V42": 0.327868852459, "V43": 5.24590163934, "V44": 4.59016393443}, "geometry": {"type": "Point", "coordinates": [-113.478263825, 53.548264075]}}, {"type": "Feature", "properties": {"city_id": "united_states_fort_worth", "city_name": "Fort Worth", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 12.3, "Surprise": 22.5, "Neutral": 19.6, "Sadness": 24.5, "Fear": 4.3, "Disgust": 4.3, "Anger": 12.6, "Exposure_a": 80.6, "Health_imp": 6.1, "Vulnerabil": 13.3, "Exposure": 80.6, "Health": 6.1, "Systems": 13.3, "E11": 45.4855195911, "E12": 1.70357751278, "E21": 0.340715502555, "E22": 1.19250425894, "E23": 4.08858603066, "E24": 4.5996592845, "E25": 0.340715502555, "E31": 16.1839863714, "E32": 3.74787052811, "E33": 2.89608177172, "H11": 0.511073253833, "H12": 0.340715502555, "H21": 1.70357751278, "H22": 0.340715502555, "H31": 0.170357751278, "H41": 3.066439523, "V11": 0.340715502555, "V21": 0.511073253833, "V22": 0.340715502555, "V31": 0.0, "V41": 2.72572402044, "V42": 0.170357751278, "V43": 5.28109028961, "V44": 3.91822827939}, "geometry": {"type": "Point", "coordinates": [-97.36403, 32.82478]}}, {"type": "Feature", "properties": {"city_id": "united_states_fresno", "city_name": "Fresno", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 16.1, "Surprise": 20.1, "Neutral": 20.7, "Sadness": 21.6, "Fear": 6.7, "Disgust": 3.4, "Anger": 11.5, "Exposure_a": 73.1, "Health_imp": 6.4, "Vulnerabil": 20.5, "Exposure": 73.1, "Health": 6.4, "Systems": 20.5, "E11": 37.445482866, "E12": 1.80685358255, "E21": 0.560747663551, "E22": 0.872274143302, "E23": 3.17757009346, "E24": 5.73208722741, "E25": 0.560747663551, "E31": 17.0716510903, "E32": 3.42679127726, "E33": 2.49221183801, "H11": 0.436137071651, "H12": 0.311526479751, "H21": 1.18380062305, "H22": 0.311526479751, "H31": 0.560747663551, "H41": 3.55140186916, "V11": 0.373831775701, "V21": 1.4953271028, "V22": 0.685358255452, "V31": 0.0, "V41": 3.67601246106, "V42": 0.311526479751, "V43": 7.41433021807, "V44": 6.54205607477}, "geometry": {"type": "Point", "coordinates": [-119.72016, 36.77999]}}, {"type": "Feature", "properties": {"city_id": "united_states_houston", "city_name": "Houston", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 10.0, "Surprise": 20.2, "Neutral": 19.4, "Sadness": 27.2, "Fear": 4.0, "Disgust": 3.9, "Anger": 15.4, "Exposure_a": 84.3, "Health_imp": 6.7, "Vulnerabil": 9.1, "Exposure": 84.3, "Health": 6.7, "Systems": 9.1, "E11": 44.2896935933, "E12": 2.22841225627, "E21": 0.452646239554, "E22": 0.766016713092, "E23": 2.40250696379, "E24": 5.64066852368, "E25": 0.487465181058, "E31": 21.7966573816, "E32": 3.41225626741, "E33": 2.78551532033, "H11": 0.348189415042, "H12": 0.452646239554, "H21": 2.22841225627, "H22": 0.104456824513, "H31": 0.383008356546, "H41": 3.16852367688, "V11": 0.626740947075, "V21": 0.41782729805, "V22": 0.591922005571, "V31": 0.0, "V41": 1.6713091922, "V42": 0.139275766017, "V43": 3.62116991643, "V44": 1.98467966574}, "geometry": {"type": "Point", "coordinates": [-95.3245, 29.7215]}}, {"type": "Feature", "properties": {"city_id": "united_states_indianapolis", "city_name": "Indianapolis", "country": "United States", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 17.9, "Surprise": 23.3, "Neutral": 19.7, "Sadness": 20.4, "Fear": 4.4, "Disgust": 4.7, "Anger": 9.6, "Exposure_a": 80.1, "Health_imp": 8.8, "Vulnerabil": 11.1, "Exposure": 80.1, "Health": 8.8, "Systems": 11.1, "E11": 42.0147420147, "E12": 2.2113022113, "E21": 1.4742014742, "E22": 0.737100737101, "E23": 2.9484029484, "E24": 6.38820638821, "E25": 0.2457002457, "E31": 18.1818181818, "E32": 1.9656019656, "E33": 3.9312039312, "H11": 0.737100737101, "H12": 0.0, "H21": 2.2113022113, "H22": 0.2457002457, "H31": 0.0, "H41": 5.65110565111, "V11": 0.4914004914, "V21": 0.4914004914, "V22": 0.737100737101, "V31": 0.0, "V41": 3.4398034398, "V42": 0.0, "V43": 4.1769041769, "V44": 1.7199017199}, "geometry": {"type": "Point", "coordinates": [-86.2816, 39.72515]}}, {"type": "Feature", "properties": {"city_id": "united_states_las_vegas", "city_name": "Las Vegas", "country": "United States", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 13.0, "Surprise": 23.2, "Neutral": 18.1, "Sadness": 21.1, "Fear": 4.1, "Disgust": 3.8, "Anger": 16.8, "Exposure_a": 80.8, "Health_imp": 5.1, "Vulnerabil": 14.1, "Exposure": 80.8, "Health": 5.1, "Systems": 14.1, "E11": 46.6472303207, "E12": 3.6443148688, "E21": 0.437317784257, "E22": 1.60349854227, "E23": 2.33236151603, "E24": 4.66472303207, "E25": 0.583090379009, "E31": 16.0349854227, "E32": 3.0612244898, "E33": 1.74927113703, "H11": 0.145772594752, "H12": 0.437317784257, "H21": 1.74927113703, "H22": 0.145772594752, "H31": 0.291545189504, "H41": 2.33236151603, "V11": 0.291545189504, "V21": 1.02040816327, "V22": 0.291545189504, "V31": 0.145772594752, "V41": 3.79008746356, "V42": 0.0, "V43": 5.39358600583, "V44": 3.20699708455}, "geometry": {"type": "Point", "coordinates": [-115.19394, 36.21205]}}, {"type": "Feature", "properties": {"city_id": "united_kingdom_leeds", "city_name": "Leeds", "country": "United Kingdom", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 12.9, "Surprise": 22.8, "Neutral": 20.3, "Sadness": 20.1, "Fear": 8.9, "Disgust": 5.5, "Anger": 9.5, "Exposure_a": 65.7, "Health_imp": 10.2, "Vulnerabil": 24.1, "Exposure": 65.7, "Health": 10.2, "Systems": 24.1, "E11": 31.4990512334, "E12": 0.948766603416, "E21": 1.1385199241, "E22": 1.32827324478, "E23": 4.36432637571, "E24": 5.31309297913, "E25": 1.1385199241, "E31": 12.5237191651, "E32": 2.84629981025, "E33": 4.55407969639, "H11": 0.379506641366, "H12": 1.32827324478, "H21": 2.65654648956, "H22": 0.189753320683, "H31": 0.0, "H41": 5.69259962049, "V11": 0.189753320683, "V21": 1.1385199241, "V22": 0.189753320683, "V31": 0.0, "V41": 2.08728652751, "V42": 0.189753320683, "V43": 6.07210626186, "V44": 14.2314990512}, "geometry": {"type": "Point", "coordinates": [-1.7636178, 53.8412818]}}, {"type": "Feature", "properties": {"city_id": "united_kingdom_liverpool", "city_name": "Liverpool", "country": "United Kingdom", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 16.2, "Surprise": 17.6, "Neutral": 18.3, "Sadness": 21.8, "Fear": 11.8, "Disgust": 3.7, "Anger": 10.6, "Exposure_a": 65.6, "Health_imp": 10.8, "Vulnerabil": 23.7, "Exposure": 65.6, "Health": 10.8, "Systems": 23.7, "E11": 28.6307053942, "E12": 0.829875518672, "E21": 1.45228215768, "E22": 1.24481327801, "E23": 4.97925311203, "E24": 7.67634854772, "E25": 1.03734439834, "E31": 12.2406639004, "E32": 4.5643153527, "E33": 2.90456431535, "H11": 0.414937759336, "H12": 1.65975103734, "H21": 3.31950207469, "H22": 0.0, "H31": 0.0, "H41": 5.39419087137, "V11": 0.0, "V21": 1.24481327801, "V22": 0.0, "V31": 0.207468879668, "V41": 2.90456431535, "V42": 0.0, "V43": 4.5643153527, "V44": 14.7302904564}, "geometry": {"type": "Point", "coordinates": [-2.849722, 53.333611]}}, {"type": "Feature", "properties": {"city_id": "canada_london", "city_name": "London", "country": "Canada", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 20.7, "Surprise": 21.7, "Neutral": 19.6, "Sadness": 20.7, "Fear": 7.6, "Disgust": 1.1, "Anger": 8.7, "Exposure_a": 75.0, "Health_imp": 7.6, "Vulnerabil": 17.4, "Exposure": 75.0, "Health": 7.6, "Systems": 17.4, "E11": 42.3913043478, "E12": 5.4347826087, "E21": 2.17391304348, "E22": 0.0, "E23": 2.17391304348, "E24": 4.34782608696, "E25": 2.17391304348, "E31": 11.9565217391, "E32": 3.26086956522, "E33": 1.08695652174, "H11": 0.0, "H12": 1.08695652174, "H21": 2.17391304348, "H22": 1.08695652174, "H31": 0.0, "H41": 3.26086956522, "V11": 0.0, "V21": 2.17391304348, "V22": 0.0, "V31": 0.0, "V41": 4.34782608696, "V42": 0.0, "V43": 4.34782608696, "V44": 6.52173913043}, "geometry": {"type": "Point", "coordinates": [-81.153889, 43.035556]}}, {"type": "Feature", "properties": {"city_id": "united_kingdom_london", "city_name": "London", "country": "United Kingdom", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 17.8, "Surprise": 20.3, "Neutral": 19.4, "Sadness": 20.8, "Fear": 8.5, "Disgust": 3.7, "Anger": 9.5, "Exposure_a": 66.7, "Health_imp": 8.2, "Vulnerabil": 25.1, "Exposure": 66.7, "Health": 8.2, "Systems": 25.1, "E11": 31.4055820971, "E12": 1.42066884586, "E21": 1.59668091526, "E22": 1.24465677646, "E23": 3.69625345738, "E24": 5.02891626854, "E25": 0.704048277596, "E31": 14.1438270053, "E32": 3.52024138798, "E33": 3.97284385215, "H11": 0.213728941413, "H12": 0.779482021624, "H21": 2.13728941413, "H22": 0.201156650742, "H31": 0.150867488056, "H41": 4.67689212975, "V11": 0.339451848127, "V21": 1.64697007795, "V22": 0.0251445813427, "V31": 0.0377168720141, "V41": 2.96706059844, "V42": 0.0125722906714, "V43": 5.59466934876, "V44": 14.4832788534}, "geometry": {"type": "Point", "coordinates": [-0.1166666, 51.5]}}, {"type": "Feature", "properties": {"city_id": "united_states_louisville", "city_name": "Louisville", "country": "United States", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 19.3, "Surprise": 22.7, "Neutral": 19.3, "Sadness": 19.0, "Fear": 6.9, "Disgust": 3.5, "Anger": 9.4, "Exposure_a": 79.5, "Health_imp": 8.4, "Vulnerabil": 12.1, "Exposure": 79.5, "Health": 8.4, "Systems": 12.1, "E11": 42.4691358025, "E12": 6.66666666667, "E21": 0.246913580247, "E22": 0.493827160494, "E23": 1.48148148148, "E24": 8.14814814815, "E25": 0.987654320988, "E31": 12.5925925926, "E32": 3.20987654321, "E33": 3.20987654321, "H11": 0.493827160494, "H12": 0.246913580247, "H21": 1.23456790123, "H22": 0.0, "H31": 1.48148148148, "H41": 4.93827160494, "V11": 0.493827160494, "V21": 1.23456790123, "V22": 0.0, "V31": 0.0, "V41": 1.23456790123, "V42": 0.493827160494, "V43": 6.91358024691, "V44": 1.72839506173}, "geometry": {"type": "Point", "coordinates": [-85.66294, 38.23021]}}, {"type": "Feature", "properties": {"city_id": "united_states_madison", "city_name": "Madison", "country": "United States", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 17.3, "Surprise": 22.2, "Neutral": 20.3, "Sadness": 18.9, "Fear": 5.4, "Disgust": 4.0, "Anger": 11.8, "Exposure_a": 80.3, "Health_imp": 7.3, "Vulnerabil": 12.4, "Exposure": 80.3, "Health": 7.3, "Systems": 12.4, "E11": 39.1078838174, "E12": 5.29045643154, "E21": 0.311203319502, "E22": 1.55601659751, "E23": 3.31950207469, "E24": 4.46058091286, "E25": 0.622406639004, "E31": 20.5394190871, "E32": 3.42323651452, "E33": 1.65975103734, "H11": 0.103734439834, "H12": 0.51867219917, "H21": 1.86721991701, "H22": 0.103734439834, "H31": 0.829875518672, "H41": 3.83817427386, "V11": 0.311203319502, "V21": 0.622406639004, "V22": 0.0, "V31": 0.103734439834, "V41": 3.63070539419, "V42": 0.207468879668, "V43": 6.32780082988, "V44": 1.24481327801}, "geometry": {"type": "Point", "coordinates": [-89.34521, 43.14069]}}, {"type": "Feature", "properties": {"city_id": "united_kingdom_manchester", "city_name": "Manchester", "country": "United Kingdom", "dominant_emotion": "Joy", "dominant_attention": "Exposure & lived experience", "Joy": 21.5, "Surprise": 20.6, "Neutral": 17.0, "Sadness": 18.5, "Fear": 8.1, "Disgust": 3.2, "Anger": 11.1, "Exposure_a": 72.1, "Health_imp": 7.8, "Vulnerabil": 20.0, "Exposure": 72.1, "Health": 7.8, "Systems": 20.0, "E11": 35.831381733, "E12": 1.52224824356, "E21": 1.75644028103, "E22": 1.28805620609, "E23": 3.16159250585, "E24": 5.85480093677, "E25": 1.52224824356, "E31": 13.9344262295, "E32": 3.86416861827, "E33": 3.39578454333, "H11": 0.234192037471, "H12": 1.05386416862, "H21": 1.75644028103, "H22": 0.117096018735, "H31": 0.585480093677, "H41": 4.09836065574, "V11": 0.117096018735, "V21": 0.936768149883, "V22": 0.0, "V31": 0.234192037471, "V41": 1.40515222482, "V42": 0.0, "V43": 4.91803278689, "V44": 12.4121779859}, "geometry": {"type": "Point", "coordinates": [-2.27495, 53.353744]}}, {"type": "Feature", "properties": {"city_id": "australia_melbourne", "city_name": "Melbourne", "country": "Australia", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 17.1, "Surprise": 22.8, "Neutral": 21.5, "Sadness": 19.9, "Fear": 5.2, "Disgust": 2.9, "Anger": 10.5, "Exposure_a": 79.6, "Health_imp": 4.8, "Vulnerabil": 15.6, "Exposure": 79.6, "Health": 4.8, "Systems": 15.6, "E11": 41.7874396135, "E12": 4.71014492754, "E21": 1.08695652174, "E22": 1.08695652174, "E23": 1.2077294686, "E24": 4.95169082126, "E25": 0.36231884058, "E31": 17.7536231884, "E32": 3.74396135266, "E33": 2.89855072464, "H11": 0.12077294686, "H12": 0.24154589372, "H21": 2.29468599034, "H22": 0.0, "H31": 0.12077294686, "H41": 2.05314009662, "V11": 0.6038647343, "V21": 0.845410628019, "V22": 0.0, "V31": 0.48309178744, "V41": 5.4347826087, "V42": 0.0, "V43": 3.86473429952, "V44": 4.34782608696}, "geometry": {"type": "Point", "coordinates": [144.9833333, -37.8333333]}}, {"type": "Feature", "properties": {"city_id": "united_states_miami", "city_name": "Miami", "country": "United States", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 14.5, "Surprise": 20.1, "Neutral": 21.7, "Sadness": 21.0, "Fear": 6.0, "Disgust": 3.9, "Anger": 12.7, "Exposure_a": 80.1, "Health_imp": 5.5, "Vulnerabil": 14.3, "Exposure": 80.1, "Health": 5.5, "Systems": 14.3, "E11": 37.4133949192, "E12": 3.92609699769, "E21": 1.15473441109, "E22": 0.230946882217, "E23": 0.923787528868, "E24": 6.00461893764, "E25": 0.461893764434, "E31": 25.1732101617, "E32": 3.23325635104, "E33": 1.61662817552, "H11": 0.230946882217, "H12": 0.461893764434, "H21": 1.84757505774, "H22": 0.0, "H31": 0.0, "H41": 3.00230946882, "V11": 0.0, "V21": 1.3856812933, "V22": 0.0, "V31": 0.0, "V41": 3.46420323326, "V42": 0.0, "V43": 5.77367205543, "V44": 3.69515011547}, "geometry": {"type": "Point", "coordinates": [-80.23347, 25.759025]}}, {"type": "Feature", "properties": {"city_id": "united_states_nashville", "city_name": "Nashville", "country": "United States", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 13.5, "Surprise": 24.2, "Neutral": 19.1, "Sadness": 21.9, "Fear": 5.6, "Disgust": 3.3, "Anger": 12.4, "Exposure_a": 81.2, "Health_imp": 8.0, "Vulnerabil": 10.9, "Exposure": 81.2, "Health": 8.0, "Systems": 10.9, "E11": 39.0738060781, "E12": 4.77568740955, "E21": 0.0, "E22": 1.73661360347, "E23": 2.89435600579, "E24": 5.499276411, "E25": 1.01302460203, "E31": 17.8002894356, "E32": 5.93342981187, "E33": 2.46020260492, "H11": 0.0, "H12": 0.434153400868, "H21": 1.59189580318, "H22": 0.144717800289, "H31": 1.15774240232, "H41": 4.63096960926, "V11": 0.144717800289, "V21": 1.3024602026, "V22": 0.144717800289, "V31": 0.434153400868, "V41": 1.88133140376, "V42": 0.0, "V43": 3.03907380608, "V44": 3.90738060781}, "geometry": {"type": "Point", "coordinates": [-86.68815, 36.11054]}}, {"type": "Feature", "properties": {"city_id": "united_states_new_orleans", "city_name": "New Orleans", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 10.3, "Surprise": 20.5, "Neutral": 17.4, "Sadness": 27.6, "Fear": 5.2, "Disgust": 4.0, "Anger": 15.0, "Exposure_a": 86.3, "Health_imp": 6.1, "Vulnerabil": 7.6, "Exposure": 86.3, "Health": 6.1, "Systems": 7.6, "E11": 43.064516129, "E12": 5.48387096774, "E21": 0.322580645161, "E22": 1.12903225806, "E23": 1.45161290323, "E24": 5.64516129032, "E25": 0.0, "E31": 22.4193548387, "E32": 3.87096774194, "E33": 2.90322580645, "H11": 0.322580645161, "H12": 0.322580645161, "H21": 2.74193548387, "H22": 0.0, "H31": 0.322580645161, "H41": 2.41935483871, "V11": 0.645161290323, "V21": 0.967741935484, "V22": 0.0, "V31": 0.0, "V41": 0.967741935484, "V42": 0.0, "V43": 3.38709677419, "V44": 1.61290322581}, "geometry": {"type": "Point", "coordinates": [-90.0728283, 30.0330033]}}, {"type": "Feature", "properties": {"city_id": "united_states_new_york", "city_name": "New York", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 16.9, "Surprise": 20.3, "Neutral": 19.6, "Sadness": 21.1, "Fear": 6.6, "Disgust": 4.0, "Anger": 11.5, "Exposure_a": 77.9, "Health_imp": 5.6, "Vulnerabil": 16.5, "Exposure": 77.9, "Health": 5.6, "Systems": 16.5, "E11": 39.4721960415, "E12": 4.9575871819, "E21": 0.603204524034, "E22": 0.508953817154, "E23": 2.29971724788, "E24": 5.07068803016, "E25": 0.546654099906, "E31": 17.1724787936, "E32": 3.27992459943, "E33": 3.99622997172, "H11": 0.0754005655042, "H12": 0.810556079171, "H21": 1.62111215834, "H22": 0.131950989632, "H31": 0.188501413761, "H41": 2.78982092366, "V11": 0.490103675778, "V21": 1.8096135721, "V22": 0.320452403393, "V31": 0.263901979265, "V41": 3.41187558907, "V42": 0.0, "V43": 4.10933081998, "V44": 6.06974552309}, "geometry": {"type": "Point", "coordinates": [-73.991625, 40.73999]}}, {"type": "Feature", "properties": {"city_id": "canada_ottawa", "city_name": "Ottawa", "country": "Canada", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 21.8, "Surprise": 21.8, "Neutral": 22.3, "Sadness": 18.6, "Fear": 7.6, "Disgust": 2.0, "Anger": 5.9, "Exposure_a": 72.6, "Health_imp": 7.3, "Vulnerabil": 20.1, "Exposure": 72.6, "Health": 7.3, "Systems": 20.1, "E11": 33.8983050847, "E12": 9.60451977401, "E21": 0.0, "E22": 1.12994350282, "E23": 1.97740112994, "E24": 3.67231638418, "E25": 0.847457627119, "E31": 11.0169491525, "E32": 5.64971751412, "E33": 4.80225988701, "H11": 0.282485875706, "H12": 0.0, "H21": 1.12994350282, "H22": 0.282485875706, "H31": 1.69491525424, "H41": 3.95480225989, "V11": 0.0, "V21": 1.41242937853, "V22": 0.0, "V31": 0.0, "V41": 3.38983050847, "V42": 0.282485875706, "V43": 10.4519774011, "V44": 4.5197740113}, "geometry": {"type": "Point", "coordinates": [-75.6929168, 45.35291665]}}, {"type": "Feature", "properties": {"city_id": "united_states_paradise", "city_name": "Paradise", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 14.3, "Surprise": 23.6, "Neutral": 16.5, "Sadness": 25.4, "Fear": 3.5, "Disgust": 3.7, "Anger": 13.0, "Exposure_a": 89.1, "Health_imp": 3.9, "Vulnerabil": 7.0, "Exposure": 89.1, "Health": 3.9, "Systems": 7.0, "E11": 47.2868217054, "E12": 5.42635658915, "E21": 0.387596899225, "E22": 0.581395348837, "E23": 2.51937984496, "E24": 8.13953488372, "E25": 0.193798449612, "E31": 18.992248062, "E32": 3.29457364341, "E33": 2.32558139535, "H11": 0.193798449612, "H12": 0.0, "H21": 1.35658914729, "H22": 0.193798449612, "H31": 0.193798449612, "H41": 1.93798449612, "V11": 0.193798449612, "V21": 0.581395348837, "V22": 0.0, "V31": 0.0, "V41": 1.74418604651, "V42": 0.0, "V43": 2.71317829457, "V44": 1.74418604651}, "geometry": {"type": "Point", "coordinates": [-115.16343, 36.0719]}}, {"type": "Feature", "properties": {"city_id": "australia_perth", "city_name": "Perth", "country": "Australia", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 15.2, "Surprise": 21.9, "Neutral": 25.3, "Sadness": 14.1, "Fear": 7.4, "Disgust": 4.1, "Anger": 11.9, "Exposure_a": 74.3, "Health_imp": 5.9, "Vulnerabil": 19.7, "Exposure": 74.3, "Health": 5.9, "Systems": 19.7, "E11": 42.0074349442, "E12": 4.46096654275, "E21": 0.743494423792, "E22": 1.48698884758, "E23": 2.60223048327, "E24": 5.57620817844, "E25": 0.371747211896, "E31": 12.2676579926, "E32": 2.23048327138, "E33": 2.60223048327, "H11": 0.371747211896, "H12": 1.85873605948, "H21": 1.48698884758, "H22": 0.743494423792, "H31": 0.0, "H41": 1.48698884758, "V11": 0.0, "V21": 1.11524163569, "V22": 0.0, "V31": 0.0, "V41": 5.94795539033, "V42": 0.0, "V43": 4.08921933086, "V44": 8.55018587361}, "geometry": {"type": "Point", "coordinates": [115.8666666, -31.9166666]}}, {"type": "Feature", "properties": {"city_id": "united_states_philadelphia", "city_name": "Philadelphia", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 15.4, "Surprise": 21.0, "Neutral": 18.5, "Sadness": 22.9, "Fear": 4.9, "Disgust": 3.4, "Anger": 13.8, "Exposure_a": 82.5, "Health_imp": 6.3, "Vulnerabil": 11.2, "Exposure": 82.5, "Health": 6.3, "Systems": 11.2, "E11": 42.800318218, "E12": 2.94351630867, "E21": 0.636435958632, "E22": 1.35242641209, "E23": 3.26173428799, "E24": 6.36435958632, "E25": 0.636435958632, "E31": 18.4566428003, "E32": 3.42084327765, "E33": 2.62529832936, "H11": 0.318217979316, "H12": 0.318217979316, "H21": 1.98886237072, "H22": 0.0, "H31": 0.079554494829, "H41": 3.5799522673, "V11": 0.397772474145, "V21": 0.715990453461, "V22": 0.0, "V31": 0.159108989658, "V41": 1.82975338107, "V42": 0.079554494829, "V43": 4.05727923628, "V44": 3.97772474145}, "geometry": {"type": "Point", "coordinates": [-75.22681, 39.87326]}}, {"type": "Feature", "properties": {"city_id": "united_states_phoenix", "city_name": "Phoenix", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 14.1, "Surprise": 21.3, "Neutral": 19.8, "Sadness": 24.8, "Fear": 4.7, "Disgust": 3.9, "Anger": 11.5, "Exposure_a": 83.4, "Health_imp": 7.7, "Vulnerabil": 8.8, "Exposure": 83.4, "Health": 7.7, "Systems": 8.8, "E11": 49.5395948435, "E12": 5.80110497238, "E21": 0.36832412523, "E22": 0.644567219153, "E23": 1.84162062615, "E24": 2.94659300184, "E25": 0.276243093923, "E31": 16.0220994475, "E32": 3.49907918969, "E33": 2.4861878453, "H11": 0.552486187845, "H12": 0.184162062615, "H21": 2.4861878453, "H22": 0.36832412523, "H31": 0.644567219153, "H41": 3.49907918969, "V11": 0.184162062615, "V21": 0.644567219153, "V22": 0.0, "V31": 0.0, "V41": 1.84162062615, "V42": 0.0, "V43": 4.14364640884, "V44": 2.02578268877}, "geometry": {"type": "Point", "coordinates": [-112.00365, 33.4278]}}, {"type": "Feature", "properties": {"city_id": "united_states_portland", "city_name": "Portland", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 17.7, "Surprise": 19.9, "Neutral": 18.3, "Sadness": 20.6, "Fear": 7.7, "Disgust": 3.3, "Anger": 12.5, "Exposure_a": 68.9, "Health_imp": 10.4, "Vulnerabil": 20.7, "Exposure": 68.9, "Health": 10.4, "Systems": 20.7, "E11": 38.2585751979, "E12": 2.3746701847, "E21": 0.65963060686, "E22": 1.71503957784, "E23": 2.3746701847, "E24": 4.08970976253, "E25": 0.791556728232, "E31": 12.9287598945, "E32": 2.90237467018, "E33": 2.77044854881, "H11": 0.131926121372, "H12": 0.395778364116, "H21": 3.03430079156, "H22": 0.131926121372, "H31": 1.31926121372, "H41": 5.40897097625, "V11": 1.05540897098, "V21": 1.71503957784, "V22": 0.65963060686, "V31": 0.791556728232, "V41": 2.50659630607, "V42": 0.131926121372, "V43": 5.672823219, "V44": 8.17941952507}, "geometry": {"type": "Point", "coordinates": [-122.60919, 45.59578]}}, {"type": "Feature", "properties": {"city_id": "united_states_richmond", "city_name": "Richmond", "country": "United States", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 17.7, "Surprise": 22.5, "Neutral": 23.0, "Sadness": 19.8, "Fear": 3.7, "Disgust": 3.4, "Anger": 9.9, "Exposure_a": 83.7, "Health_imp": 5.1, "Vulnerabil": 11.2, "Exposure": 83.7, "Health": 5.1, "Systems": 11.2, "E11": 40.302743614, "E12": 4.91958372753, "E21": 0.473036896878, "E22": 0.946073793756, "E23": 1.79754020814, "E24": 5.86565752129, "E25": 1.04068117313, "E31": 21.0974456008, "E32": 2.74361400189, "E33": 4.54115421003, "H11": 0.0, "H12": 0.473036896878, "H21": 1.32450331126, "H22": 0.0946073793756, "H31": 0.189214758751, "H41": 3.02743614002, "V11": 0.662251655629, "V21": 1.22989593188, "V22": 0.0946073793756, "V31": 0.0946073793756, "V41": 2.17596972564, "V42": 0.0, "V43": 4.2573320719, "V44": 2.64900662252}, "geometry": {"type": "Point", "coordinates": [-77.32338, 37.51154]}}, {"type": "Feature", "properties": {"city_id": "united_states_san_antonio", "city_name": "San Antonio", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 13.2, "Surprise": 17.8, "Neutral": 20.2, "Sadness": 21.9, "Fear": 6.3, "Disgust": 3.9, "Anger": 16.8, "Exposure_a": 78.6, "Health_imp": 8.6, "Vulnerabil": 12.7, "Exposure": 78.6, "Health": 8.6, "Systems": 12.7, "E11": 44.6398659966, "E12": 2.42881072027, "E21": 0.0, "E22": 0.586264656616, "E23": 2.59631490787, "E24": 4.52261306533, "E25": 0.753768844221, "E31": 16.4154103853, "E32": 4.02010050251, "E33": 2.68006700168, "H11": 0.251256281407, "H12": 0.670016750419, "H21": 2.42881072027, "H22": 0.335008375209, "H31": 0.251256281407, "H41": 4.69011725293, "V11": 0.251256281407, "V21": 1.17252931323, "V22": 0.502512562814, "V31": 0.167504187605, "V41": 1.08877721943, "V42": 0.167504187605, "V43": 6.86767169179, "V44": 2.51256281407}, "geometry": {"type": "Point", "coordinates": [-98.58333, 29.38333]}}, {"type": "Feature", "properties": {"city_id": "united_states_san_diego", "city_name": "San Diego", "country": "United States", "dominant_emotion": "Sadness", "dominant_attention": "Exposure & lived experience", "Joy": 16.6, "Surprise": 19.2, "Neutral": 20.3, "Sadness": 22.9, "Fear": 5.5, "Disgust": 3.4, "Anger": 12.1, "Exposure_a": 74.3, "Health_imp": 5.6, "Vulnerabil": 20.1, "Exposure": 74.3, "Health": 5.6, "Systems": 20.1, "E11": 37.4363327674, "E12": 5.00848896435, "E21": 0.764006791171, "E22": 1.01867572156, "E23": 1.8675721562, "E24": 6.02716468591, "E25": 2.03735144312, "E31": 14.8556876061, "E32": 3.22580645161, "E33": 2.03735144312, "H11": 0.0, "H12": 0.169779286927, "H21": 1.61290322581, "H22": 0.25466893039, "H31": 0.848896434635, "H41": 2.71646859083, "V11": 0.169779286927, "V21": 1.61290322581, "V22": 0.339558573854, "V31": 0.169779286927, "V41": 2.97113752122, "V42": 0.0848896434635, "V43": 6.45161290323, "V44": 8.31918505942}, "geometry": {"type": "Point", "coordinates": [-117.34962, 33.21946]}}, {"type": "Feature", "properties": {"city_id": "united_states_san_francisco", "city_name": "San Francisco", "country": "United States", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 21.5, "Surprise": 19.1, "Neutral": 23.9, "Sadness": 16.5, "Fear": 6.8, "Disgust": 3.2, "Anger": 8.9, "Exposure_a": 68.5, "Health_imp": 4.5, "Vulnerabil": 27.0, "Exposure": 68.5, "Health": 4.5, "Systems": 27.0, "E11": 34.2497136312, "E12": 2.74914089347, "E21": 0.229095074456, "E22": 1.60366552119, "E23": 1.94730813288, "E24": 4.00916380298, "E25": 0.343642611684, "E31": 15.0057273769, "E32": 4.35280641466, "E33": 4.00916380298, "H11": 0.343642611684, "H12": 0.229095074456, "H21": 1.26002290951, "H22": 0.229095074456, "H31": 0.114547537228, "H41": 2.29095074456, "V11": 0.801832760596, "V21": 3.09278350515, "V22": 0.458190148912, "V31": 0.229095074456, "V41": 4.46735395189, "V42": 0.114547537228, "V43": 5.95647193585, "V44": 11.9129438717}, "geometry": {"type": "Point", "coordinates": [-122.358334444, 37.8283111111]}}, {"type": "Feature", "properties": {"city_id": "united_states_seattle", "city_name": "Seattle", "country": "United States", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 16.7, "Surprise": 20.3, "Neutral": 22.6, "Sadness": 21.6, "Fear": 5.3, "Disgust": 3.0, "Anger": 10.5, "Exposure_a": 76.9, "Health_imp": 5.8, "Vulnerabil": 17.3, "Exposure": 76.9, "Health": 5.8, "Systems": 17.3, "E11": 42.6041666667, "E12": 2.29166666667, "E21": 0.9375, "E22": 0.729166666667, "E23": 1.66666666667, "E24": 4.47916666667, "E25": 0.729166666667, "E31": 16.4583333333, "E32": 4.16666666667, "E33": 2.8125, "H11": 0.0, "H12": 0.9375, "H21": 2.60416666667, "H22": 0.104166666667, "H31": 0.520833333333, "H41": 1.66666666667, "V11": 0.729166666667, "V21": 1.04166666667, "V22": 0.0, "V31": 0.0, "V41": 4.27083333333, "V42": 0.104166666667, "V43": 4.47916666667, "V44": 6.66666666667}, "geometry": {"type": "Point", "coordinates": [-122.31475, 47.54554]}}, {"type": "Feature", "properties": {"city_id": "united_kingdom_sheffield", "city_name": "Sheffield", "country": "United Kingdom", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 20.7, "Surprise": 22.2, "Neutral": 19.2, "Sadness": 18.8, "Fear": 7.3, "Disgust": 1.9, "Anger": 9.8, "Exposure_a": 66.3, "Health_imp": 9.2, "Vulnerabil": 24.5, "Exposure": 66.3, "Health": 9.2, "Systems": 24.5, "E11": 28.813559322, "E12": 0.564971751412, "E21": 1.5065913371, "E22": 1.69491525424, "E23": 5.08474576271, "E24": 4.5197740113, "E25": 0.188323917137, "E31": 18.0790960452, "E32": 2.82485875706, "E33": 3.0131826742, "H11": 0.376647834275, "H12": 0.75329566855, "H21": 4.14312617702, "H22": 0.188323917137, "H31": 0.0, "H41": 3.76647834275, "V11": 0.564971751412, "V21": 1.12994350282, "V22": 0.0, "V31": 0.75329566855, "V41": 2.44821092279, "V42": 0.0, "V43": 5.64971751412, "V44": 13.9359698682}, "geometry": {"type": "Point", "coordinates": [-1.6666666, 53.6]}}, {"type": "Feature", "properties": {"city_id": "australia_sydney", "city_name": "Sydney", "country": "Australia", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 14.7, "Surprise": 19.5, "Neutral": 28.0, "Sadness": 19.3, "Fear": 3.9, "Disgust": 4.1, "Anger": 10.3, "Exposure_a": 77.5, "Health_imp": 1.4, "Vulnerabil": 21.1, "Exposure": 77.5, "Health": 1.4, "Systems": 21.1, "E11": 43.2183908046, "E12": 6.66666666667, "E21": 0.689655172414, "E22": 0.919540229885, "E23": 0.919540229885, "E24": 5.28735632184, "E25": 0.229885057471, "E31": 15.8620689655, "E32": 0.919540229885, "E33": 2.75862068966, "H11": 0.0, "H12": 0.229885057471, "H21": 0.459770114943, "H22": 0.0, "H31": 0.0, "H41": 0.689655172414, "V11": 0.919540229885, "V21": 1.37931034483, "V22": 0.0, "V31": 0.0, "V41": 8.96551724138, "V42": 0.919540229885, "V43": 6.4367816092, "V44": 2.52873563218}, "geometry": {"type": "Point", "coordinates": [151.2, -33.85]}}, {"type": "Feature", "properties": {"city_id": "canada_toronto", "city_name": "Toronto", "country": "Canada", "dominant_emotion": "Joy", "dominant_attention": "Exposure & lived experience", "Joy": 21.9, "Surprise": 21.0, "Neutral": 20.3, "Sadness": 18.4, "Fear": 6.4, "Disgust": 3.2, "Anger": 8.8, "Exposure_a": 79.8, "Health_imp": 7.7, "Vulnerabil": 12.5, "Exposure": 79.8, "Health": 7.7, "Systems": 12.5, "E11": 38.9519650655, "E12": 5.6768558952, "E21": 0.698689956332, "E22": 1.65938864629, "E23": 1.92139737991, "E24": 4.45414847162, "E25": 0.786026200873, "E31": 19.3013100437, "E32": 2.44541484716, "E33": 3.93013100437, "H11": 0.0873362445415, "H12": 0.436681222707, "H21": 2.5327510917, "H22": 0.174672489083, "H31": 1.39737991266, "H41": 3.05676855895, "V11": 0.61135371179, "V21": 1.57205240175, "V22": 0.0, "V31": 0.0, "V41": 2.70742358079, "V42": 0.0, "V43": 3.66812227074, "V44": 3.93013100437}, "geometry": {"type": "Point", "coordinates": [-79.39166665, 43.6416666]}}, {"type": "Feature", "properties": {"city_id": "canada_vancouver", "city_name": "Vancouver", "country": "Canada", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 18.5, "Surprise": 19.8, "Neutral": 25.4, "Sadness": 19.0, "Fear": 9.2, "Disgust": 1.0, "Anger": 7.1, "Exposure_a": 66.3, "Health_imp": 7.3, "Vulnerabil": 26.3, "Exposure": 66.3, "Health": 7.3, "Systems": 26.3, "E11": 32.8846153846, "E12": 1.73076923077, "E21": 0.384615384615, "E22": 1.34615384615, "E23": 2.69230769231, "E24": 3.84615384615, "E25": 0.384615384615, "E31": 15.1923076923, "E32": 3.84615384615, "E33": 4.03846153846, "H11": 0.769230769231, "H12": 0.576923076923, "H21": 2.5, "H22": 0.0, "H31": 0.576923076923, "H41": 2.88461538462, "V11": 0.769230769231, "V21": 4.03846153846, "V22": 0.0, "V31": 0.384615384615, "V41": 5.0, "V42": 1.15384615385, "V43": 4.80769230769, "V44": 10.1923076923}, "geometry": {"type": "Point", "coordinates": [-123.1505553, 49.23861115]}}, {"type": "Feature", "properties": {"city_id": "united_states_vancouver", "city_name": "Vancouver", "country": "United States", "dominant_emotion": "Surprise", "dominant_attention": "Exposure & lived experience", "Joy": 15.3, "Surprise": 23.4, "Neutral": 20.7, "Sadness": 23.4, "Fear": 7.2, "Disgust": 3.6, "Anger": 6.3, "Exposure_a": 58.6, "Health_imp": 9.0, "Vulnerabil": 32.4, "Exposure": 58.6, "Health": 9.0, "Systems": 32.4, "E11": 41.4414414414, "E12": 0.900900900901, "E21": 0.0, "E22": 0.900900900901, "E23": 1.8018018018, "E24": 6.30630630631, "E25": 0.0, "E31": 3.6036036036, "E32": 1.8018018018, "E33": 1.8018018018, "H11": 0.0, "H12": 0.900900900901, "H21": 5.40540540541, "H22": 0.0, "H31": 0.0, "H41": 2.7027027027, "V11": 1.8018018018, "V21": 2.7027027027, "V22": 0.0, "V31": 0.0, "V41": 3.6036036036, "V42": 0.900900900901, "V43": 9.00900900901, "V44": 14.4144144144}, "geometry": {"type": "Point", "coordinates": [-122.65421, 45.62102]}}, {"type": "Feature", "properties": {"city_id": "canada_winnipeg", "city_name": "Winnipeg", "country": "Canada", "dominant_emotion": "Neutral", "dominant_attention": "Exposure & lived experience", "Joy": 20.6, "Surprise": 19.3, "Neutral": 21.9, "Sadness": 20.2, "Fear": 4.7, "Disgust": 2.6, "Anger": 10.7, "Exposure_a": 80.3, "Health_imp": 8.2, "Vulnerabil": 11.6, "Exposure": 80.3, "Health": 8.2, "Systems": 11.6, "E11": 39.4849785408, "E12": 5.57939914163, "E21": 0.0, "E22": 1.28755364807, "E23": 0.429184549356, "E24": 7.72532188841, "E25": 1.28755364807, "E31": 14.1630901288, "E32": 4.72103004292, "E33": 5.57939914163, "H11": 0.0, "H12": 0.0, "H21": 3.86266094421, "H22": 0.429184549356, "H31": 0.0, "H41": 3.86266094421, "V11": 0.429184549356, "V21": 1.71673819742, "V22": 0.858369098712, "V31": 0.858369098712, "V41": 2.14592274678, "V42": 0.0, "V43": 3.86266094421, "V44": 1.71673819742}, "geometry": {"type": "Point", "coordinates": [-97.2021842, 49.9033453]}}]};
window.CITY_DATA = CITY_DATA;

const emotionColors = {
  Joy: "#FFB000",
  Surprise: "#FF8A3D",
  Neutral: "#9FB7C9",
  Sadness: "#58A6FF",
  Fear: "#43E0FF",
  Disgust: "#C77DFF",
  Anger: "#FF5CA8"
};

const emotionEmoji = {
  Joy: "😊",
  Surprise: "😮",
  Neutral: "😐",
  Sadness: "😢",
  Fear: "😨",
  Disgust: "🤢",
  Anger: "😡"
};

const emotionList = ["Joy", "Surprise", "Neutral", "Sadness", "Fear", "Disgust", "Anger"];

const VARIABLE_GROUPS = {
  emotion: [
    { key: "Joy", label: "Joy", unit: "%", group: "emotion" },
    { key: "Sadness", label: "Sadness", unit: "%", group: "emotion" },
    { key: "Fear", label: "Fear", unit: "%", group: "emotion" },
    { key: "Anger", label: "Anger", unit: "%", group: "emotion" },
    { key: "Surprise", label: "Surprise", unit: "%", group: "emotion" },
    { key: "Neutral", label: "Neutral", unit: "%", group: "emotion" },
    { key: "Disgust", label: "Disgust", unit: "%", group: "emotion" }
  ],

  attention: [
    { key: "Exposure", alt: ["Exposure_a"], label: "Exposure & lived experience", unit: "%", group: "attention" },
    { key: "Health", alt: ["Health_imp"], label: "Health impacts & burden", unit: "%", group: "attention" },
    { key: "Systems", alt: ["Vulnerabil"], label: "Systems & governance", unit: "%", group: "attention" }
  ],

  mechanism: [
    { key: "E21", label: "E21 Sleep disruption", unit: "%", group: "mechanism" },
    { key: "E23", label: "E23 Work / commute burden", unit: "%", group: "mechanism" },
    { key: "E33", label: "E33 Consumptive cooling", unit: "%", group: "mechanism" },
    { key: "H21", label: "H21 Physical health outcomes", unit: "%", group: "mechanism" },
    { key: "H41", label: "H41 Health warnings", unit: "%", group: "mechanism" },
    { key: "V11", label: "V11 Social vulnerability", unit: "%", group: "mechanism" },
    { key: "V21", label: "V21 Urban planning / cooling", unit: "%", group: "mechanism" }
  ]
};

let currentGroup = "emotion";
let currentVariable = VARIABLE_GROUPS.emotion.find(v => v.key === "Sadness");
let selectedCityId = CITY_DATA.features[0].properties.city_id;

let distributionChart = null;
let miniDistributionChart = null;
let attentionChart = null;
let scatterChart = null;
let dominantChart = null;

const chartTextColor = "#eef8ff";
const chartSubTextColor = "#9fc5da";
const axisLineColor = "rgba(177,224,255,0.22)";
const splitLineColor = "rgba(177,224,255,0.08)";

CITY_DATA.features.forEach(feature => {
  const emotion = String(feature.properties.dominant_emotion || "").trim();
  feature.properties.dominant_emotion = emotion;
  feature.properties.emoji = emotionEmoji[emotion] || "●";
});














// =========================================================
// Map
// =========================================================

const map = new mapboxgl.Map({
  container: "global-map",
  style: "mapbox://styles/mapbox/light-v11",
  center: [-98, 39],
  zoom: 2.55,
  projection: "globe",
  pitch: 0,
  bearing: 0
});

/* === MUTED MAPBOX BLUE APPLY START === */
try {
  window.__thermalMapboxMap = map;
  if (window.applyMutedMapboxBlue) {
    window.applyMutedMapboxBlue(map);
  }
} catch (err) {
  console.warn("[Muted Mapbox Blue] apply failed:", err);
}
/* === MUTED MAPBOX BLUE APPLY END === */

map.addControl(new mapboxgl.NavigationControl(), "top-left");

// LIGHT_BLUE_GLOBE_THEME_V21
map.on("style.load", () => {
  map.setProjection("globe");
  applyLightBlueGlobeTheme(map);
});

map.on("load", () => {
  setTimeout(() => {
    applyLightBlueGlobeTheme(map);
    map.resize();
  }, 200);
});


map.on("load", () => {
  setTimeout(() => {
    applyLightBlueGlobeTheme(map);
    map.resize();
  }, 200);
});

});

});

// MAIN_MAP_GLOBE_FOG_V8
map.on("style.load", () => {
  map.setFog({
    color: "rgb(235, 246, 252)",
    "high-color": "rgb(162, 201, 228)",
    "horizon-blend": 0.08,
    "space-color": "rgb(246, 251, 255)",
    "star-intensity": 0.0
  });
});

map.on("load", () => {
  prepareCurrentValues();
  drawMapLayers();
  initControls();
  initCharts();

  const selectedFeature = getSelectedFeature();
  updatePanel(selectedFeature.properties);
  drawAllCharts(selectedFeature.properties);
});

function drawMapLayers() {
  map.addSource("cities", {
    type: "geojson",
    data: CITY_DATA
  });

  map.addLayer({
    id: "city-glow",
    type: "circle",
    source: "cities",
    paint: getGlowPaint()
  });

  map.addLayer({
    id: "city-core",
    type: "circle",
    source: "cities",
    paint: getCorePaint()
  });

  map.addLayer({
    id: "city-click-area",
    type: "circle",
    source: "cities",
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 16, 4, 24, 7, 32],
      "circle-color": "#ffffff",
      "circle-opacity": 0
    }
  });
  // Keep a global globe view instead of zooming into a local bounding box
  map.jumpTo({ center: [-98, 39], zoom: 2.55, bearing: 0, pitch: 0 });

  setTimeout(() => {
    map.resize();
  }, 200);

map.on("mouseenter", "city-click-area", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "city-click-area", () => {
    map.getCanvas().style.cursor = "";
  });

  map.on("click", "city-click-area", (event) => {
    const feature = event.features[0];
    selectedCityId = feature.properties.city_id;

    const selectedFeature = getSelectedFeature();
    const p = selectedFeature.properties;
    const coordinates = selectedFeature.geometry.coordinates.slice();

    updatePanel(p);
    drawAllCharts(p);

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`
        <strong>${p.city_name}</strong><br>
        ${currentVariable.label}: ${formatValue(getValue(p, currentVariable))}${currentVariable.unit}<br>
        Dominant emotion: ${p.emoji} ${p.dominant_emotion}
      `)
      .addTo(map);

    map.flyTo({ center: coordinates, zoom: 2.75,
      speed: 0.8 });
  });
}

function getRamp(variable) {
  if (variable.key === "Joy") return ["#071729", "#27b9ff", "#ffb000"];
  if (variable.key === "Sadness") return ["#071729", "#58a6ff", "#ff5ca8"];
  if (variable.key === "Fear") return ["#071729", "#43e0ff", "#7c5cff"];
  if (variable.key === "Anger") return ["#071729", "#ff5ca8", "#ff8a3d"];
  if (variable.key === "Surprise") return ["#071729", "#27b9ff", "#ff8a3d"];
  if (variable.key === "Neutral") return ["#071729", "#6f8da5", "#c7d7e5"];
  if (variable.key === "Disgust") return ["#071729", "#7c5cff", "#c77dff"];

  if (variable.group === "attention") return ["#071729", "#27b9ff", "#ff8a3d"];
  if (variable.group === "mechanism") return ["#071729", "#43e0ff", "#ff5ca8"];

  return ["#071729", "#27b9ff", "#ff8a3d"];
}

function getValueRange() {
  const values = CITY_DATA.features
    .map(f => Number(f.properties.current_value))
    .filter(v => Number.isFinite(v));

  let min = Math.min(...values);
  let max = Math.max(...values);

  if (min === max) {
    max = min + 1;
  }

  return { min, max, mid: (min + max) / 2 };
}

function getColorExpression() {
  const { min, mid, max } = getValueRange();
  const ramp = getRamp(currentVariable);

  return [
    "interpolate",
    ["linear"],
    ["get", "current_value"],
    min, ramp[0],
    mid, ramp[1],
    max, ramp[2]
  ];
}

function getGlowPaint() {
  const { min, max } = getValueRange();

  return {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["get", "current_value"],
      min, 12,
      max, 34
    ],
    "circle-color": getColorExpression(),
    "circle-opacity": [
      "interpolate",
      ["linear"],
      ["get", "current_value"],
      min, 0.12,
      max, 0.48
    ],
    "circle-blur": 1.2
  };
}

function getCorePaint() {
  const { min, max } = getValueRange();

  return {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["get", "current_value"],
      min, 5,
      max, 13
    ],
    "circle-color": getColorExpression(),
    "circle-opacity": 0.95,
    "circle-stroke-color": "#d8f3ff",
    "circle-stroke-width": 1.0
  };
}

function refreshMapStyle() {
  prepareCurrentValues();

  if (map.getSource("cities")) {
    map.getSource("cities").setData(CITY_DATA);
  }

  if (map.getLayer("city-glow")) {
    map.setPaintProperty("city-glow", "circle-radius", getGlowPaint()["circle-radius"]);
    map.setPaintProperty("city-glow", "circle-color", getGlowPaint()["circle-color"]);
    map.setPaintProperty("city-glow", "circle-opacity", getGlowPaint()["circle-opacity"]);
  }

  if (map.getLayer("city-core")) {
    map.setPaintProperty("city-core", "circle-radius", getCorePaint()["circle-radius"]);
    map.setPaintProperty("city-core", "circle-color", getCorePaint()["circle-color"]);
  }

  updateGradientLegend();

  const selectedFeature = getSelectedFeature();
  updatePanel(selectedFeature.properties);
  drawAllCharts(selectedFeature.properties);
}


// =========================================================
// Controls
// =========================================================

function initControls() {
  const groupSelect = document.getElementById("group-select");
  const variableSelect = document.getElementById("variable-select");

  groupSelect.value = currentGroup;
  populateVariableSelect();

  groupSelect.addEventListener("change", () => {
    currentGroup = groupSelect.value;
    currentVariable = VARIABLE_GROUPS[currentGroup][0];
    populateVariableSelect();
    refreshMapStyle();
  });

  variableSelect.addEventListener("change", () => {
    const selectedKey = variableSelect.value;
    currentVariable = VARIABLE_GROUPS[currentGroup].find(v => v.key === selectedKey);
    refreshMapStyle();
  });
}

function populateVariableSelect() {
  const variableSelect = document.getElementById("variable-select");
  variableSelect.innerHTML = "";

  VARIABLE_GROUPS[currentGroup].forEach(variable => {
    const option = document.createElement("option");
    option.value = variable.key;
    option.textContent = variable.label;
    variableSelect.appendChild(option);
  });

  variableSelect.value = currentVariable.key;
}


// =========================================================
// Data helpers
// =========================================================

function getValue(properties, variable) {
  const candidates = [variable.key].concat(variable.alt || []);

  for (const key of candidates) {
    const value = Number(properties[key]);
    if (Number.isFinite(value)) {
      return value;
    }
  }

  return 0;
}

function prepareCurrentValues() {
  CITY_DATA.features.forEach(feature => {
    feature.properties.current_value = getValue(feature.properties, currentVariable);
  });
}

function getSelectedFeature() {
  return CITY_DATA.features.find(f => f.properties.city_id === selectedCityId) || CITY_DATA.features[0];
}

function getPercentile(value) {
  const values = CITY_DATA.features
    .map(f => getValue(f.properties, currentVariable))
    .filter(v => Number.isFinite(v))
    .sort((a, b) => a - b);

  const count = values.filter(v => v <= value).length;
  return count / values.length;
}

function getLevel(percentile) {
  if (percentile >= 0.8) return "Very High";
  if (percentile >= 0.6) return "High";
  if (percentile >= 0.4) return "Medium";
  if (percentile >= 0.2) return "Low";
  return "Very Low";
}

function formatValue(value) {
  return Number(value).toFixed(1);
}


// =========================================================
// Panel
// =========================================================






function updatePanel(properties) {
  const value = getValue(properties, currentVariable);
  const percentile = getPercentile(value);
  const level = getLevel(percentile);
  const emotion = properties.dominant_emotion || "";
  const emoji = emotionEmoji[emotion] || "";

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("panel-variable-title", currentVariable.label);
  setText("profile-variable-value", formatValue(value));
  setText("profile-variable-unit", currentVariable.unit || "");
  setText("profile-city", properties.city_name || "Click a city");
  setText("profile-country", properties.country || properties.country_no || "—");
  setText("profile-level", `${level} · ${(percentile * 100).toFixed(0)}th percentile`);
  setText("profile-emotion", `${emoji} ${emotion || "—"}`);
  setText("profile-attention", properties.dominant_attention || "Exposure & lived experience");

  updateGradientLegend();
}






function updateGradientLegend() {
  const { min, max } = getValueRange();
  const ramp = getRamp(currentVariable);

  document.querySelector(".gradient-bar").style.background =
    `linear-gradient(90deg, ${ramp[0]}, ${ramp[1]}, ${ramp[2]})`;

  document.getElementById("legend-min").textContent = formatValue(min) + currentVariable.unit;
  document.getElementById("legend-max").textContent = formatValue(max) + currentVariable.unit;
}


// =========================================================
// Charts
// =========================================================

function initCharts() {
  if (typeof echarts === "undefined") {
    console.error("ECharts not loaded.");
    return;
  }

  distributionChart = echarts.init(document.getElementById("distribution-chart"));

  const miniDistributionEl = document.getElementById("mini-distribution-chart");
  if (miniDistributionEl) {
    miniDistributionChart = echarts.init(miniDistributionEl);
  }
  attentionChart = echarts.init(document.getElementById("attention-chart"));
  scatterChart = echarts.init(document.getElementById("scatter-chart"));
  dominantChart = echarts.init(document.getElementById("dominant-chart"));
}

function drawAllCharts(selectedProperties) {
  if (!distributionChart) return;

  drawMiniDistributionChart(selectedProperties);
  drawDistributionChart(selectedProperties);
  drawAttentionChart(selectedProperties);
  drawScatterChart();
  drawDominantChart();
}









function drawMiniDistributionChart(selectedProperties) {
  if (!miniDistributionChart) return;

  const rawValues = CITY_DATA.features
    .map(f => getValue(f.properties, currentVariable))
    .filter(v => Number.isFinite(v));

  if (!rawValues.length) return;

  const values = rawValues.slice().sort((a, b) => a - b);
  const selectedValue = getValue(selectedProperties, currentVariable);
  const selectedPercentile = getPercentile(selectedValue) * 100;
  const ramp = getRamp(currentVariable);

  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const binCount = Math.min(12, Math.max(7, Math.round(Math.sqrt(values.length) * 1.5)));
  const range = maxVal - minVal || 1;
  const step = range / binCount;

  const bins = Array.from({ length: binCount }, (_, i) => {
    const x0 = minVal + i * step;
    const x1 = i === binCount - 1 ? maxVal : x0 + step;
    return {
      x0,
      x1,
      center: (x0 + x1) / 2,
      count: 0
    };
  });

  values.forEach(v => {
    let idx = Math.floor((v - minVal) / step);
    if (idx < 0) idx = 0;
    if (idx >= binCount) idx = binCount - 1;
    bins[idx].count += 1;
  });

  const smoothCounts = bins.map((b, i) => {
    const prev = bins[Math.max(0, i - 1)].count;
    const curr = b.count;
    const next = bins[Math.min(binCount - 1, i + 1)].count;

    if (i === 0) return curr * 0.65 + next * 0.35;
    if (i === binCount - 1) return prev * 0.35 + curr * 0.65;

    return prev * 0.25 + curr * 0.50 + next * 0.25;
  });

  const lineData = bins.map((b, i) => [b.center, smoothCounts[i]]);
  const barData = bins.map(b => [b.center, b.count]);

  let selectedBinIndex = Math.floor((selectedValue - minVal) / step);
  if (selectedBinIndex < 0) selectedBinIndex = 0;
  if (selectedBinIndex >= binCount) selectedBinIndex = binCount - 1;

  const selectedY = Math.max(
    bins[selectedBinIndex].count,
    smoothCounts[selectedBinIndex],
    1
  );

  const percentileLabel = document.getElementById("mini-percentile-label");
  if (percentileLabel) {
    percentileLabel.textContent = `${selectedPercentile.toFixed(0)}TH PERCENTILE`;
  }

  miniDistributionChart.setOption({
    animation: true,
    grid: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 24
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(14, 31, 47, 0.96)",
      borderColor: "rgba(210,232,244,0.25)",
      textStyle: {
        color: "#ffffff",
        fontSize: 12
      },
      formatter: function(params) {
        if (params.seriesType === "scatter") {
          return `
            <strong>${selectedProperties.city_name}</strong><br/>
            ${currentVariable.label}: ${selectedValue.toFixed(1)}${currentVariable.unit}<br/>
            Percentile: ${selectedPercentile.toFixed(0)}%
          `;
        }

        if (params.seriesType === "bar") {
          const bin = bins[params.dataIndex];
          return `
            ${currentVariable.label}<br/>
            ${bin.x0.toFixed(1)}–${bin.x1.toFixed(1)}${currentVariable.unit}<br/>
            Cities: ${bin.count}
          `;
        }

        return `${currentVariable.label}`;
      }
    },
    xAxis: {
      type: "value",
      min: minVal,
      max: maxVal,
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(220,238,248,0.30)"
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: "rgba(220,238,248,0.66)",
        fontSize: 10,
        formatter: function(value) {
          if (Math.abs(value - minVal) < step * 0.4) return minVal.toFixed(0);
          if (Math.abs(value - maxVal) < step * 0.4) return maxVal.toFixed(0);
          return "";
        }
      }
    },
    yAxis: {
      type: "value",
      show: false,
      min: 0
    },
    series: [
      {
        name: "Histogram",
        type: "bar",
        data: barData,
        barWidth: "70%",
        itemStyle: {
          color: "rgba(131, 199, 255, 0.22)",
          borderRadius: [3, 3, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: "rgba(237, 105, 173, 0.30)"
          }
        }
      },
      {
        name: "Density",
        type: "line",
        smooth: true,
        symbol: "none",
        data: lineData,
        lineStyle: {
          width: 2.4,
          color: ramp[2]
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "rgba(131, 199, 255, 0.05)" },
              { offset: 0.50, color: "rgba(157, 99, 255, 0.10)" },
              { offset: 1, color: "rgba(237, 105, 173, 0.18)" }
            ]
          }
        },
        markLine: {
          symbol: "none",
          silent: true,
          lineStyle: {
            color: "#f2a06b",
            width: 2,
            type: "solid"
          },
          label: {
            show: false
          },
          data: [
            { xAxis: selectedValue }
          ]
        }
      },
      {
        name: "Selected city",
        type: "scatter",
        symbolSize: 14,
        data: [[selectedValue, selectedY]],
        itemStyle: {
          color: "#ffffff",
          borderColor: "#f2a06b",
          borderWidth: 3,
          shadowBlur: 16,
          shadowColor: "rgba(242,160,107,0.70)"
        },
        z: 10
      }
    ]
  }, true);
}









function drawDistributionChart(selectedProperties) {
  const values = CITY_DATA.features
    .map(f => getValue(f.properties, currentVariable))
    .filter(v => Number.isFinite(v))
    .sort((a, b) => a - b);

  const n = values.length;

  const curveData = values.map((v, i) => [
    n === 1 ? 0 : (i / (n - 1)) * 100,
    v
  ]);

  const selectedValue = getValue(selectedProperties, currentVariable);
  const selectedPercentile = getPercentile(selectedValue) * 100;

  const ramp = getRamp(currentVariable);

  distributionChart.setOption({
    tooltip: {
      trigger: "axis",
      formatter: function(params) {
        return `${currentVariable.label}<br/>Percentile: ${params[0].value[0].toFixed(0)}%<br/>Value: ${params[0].value[1].toFixed(1)}${currentVariable.unit}`;
      }
    },
    grid: {
      left: 55,
      right: 26,
      top: 28,
      bottom: 48
    },
    xAxis: {
      type: "value",
      name: "City percentile",
      nameLocation: "middle",
      nameGap: 30,
      min: 0,
      max: 100,
      axisLabel: { color: chartSubTextColor },
      nameTextStyle: { color: chartSubTextColor },
      axisLine: { lineStyle: { color: axisLineColor } },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    yAxis: {
      type: "value",
      name: currentVariable.unit,
      axisLabel: { color: chartSubTextColor },
      nameTextStyle: { color: chartSubTextColor },
      axisLine: { lineStyle: { color: axisLineColor } },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    series: [
      {
        name: "All cities",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          width: 3,
          color: ramp[2]
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "rgba(106, 141, 255, 0.08)" },
              { offset: 1, color: "rgba(255, 122, 61, 0.26)" }
            ]
          }
        },
        data: curveData
      },
      {
        name: selectedProperties.city_name,
        type: "scatter",
        symbolSize: 18,
        itemStyle: {
          color: "#ffffff",
          borderColor: ramp[2],
          borderWidth: 3
        },
        data: [[selectedPercentile, selectedValue]]
      }
    ]
  });
}

function drawAttentionChart(p) {
  if (!attentionChart) return;

  const categories = [
    "Exposure & lived experience",
    "Health impacts & burden",
    "Systems & governance"
  ];

  const values = [
    Number(p.Exposure) || Number(p.Exposure_a) || 0,
    Number(p.Health) || Number(p.Health_imp) || 0,
    Number(p.Systems) || Number(p.Vulnerabil) || 0
  ];

  attentionChart.setOption({
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: 155, right: 38, top: 24, bottom: 28 },
    xAxis: {
      type: "value",
      max: 100,
      axisLabel: { color: chartSubTextColor, formatter: "{value}%" },
      axisLine: { lineStyle: { color: axisLineColor } },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    yAxis: {
      type: "category",
      data: categories,
      axisLabel: { color: chartTextColor, fontSize: 11 },
      axisLine: { lineStyle: { color: axisLineColor } }
    },
    series: [
      {
        type: "bar",
        data: values,
        barWidth: 18,
        itemStyle: {
          color: "#ff5ca8",
          borderRadius: [0, 8, 8, 0]
        },
        label: {
          show: true,
          position: "right",
          color: chartTextColor,
          formatter: function(params) {
            return params.value.toFixed(1) + "%";
          }
        }
      }
    ]
  });
}

function drawScatterChart() {
  if (!scatterChart) return;

  const data = CITY_DATA.features.map(feature => {
    const p = feature.properties;
    const x = Number(p.Health) || Number(p.Health_imp) || 0;
    const y = Number(p.Fear) || 0;
    const emotion = p.dominant_emotion || "Neutral";

    return {
      name: p.city_name,
      value: [x, y],
      itemStyle: {
        color: emotionColors[emotion] || "#ffffff"
      }
    };
  });

  scatterChart.setOption({
    tooltip: {
      trigger: "item",
      formatter: function(params) {
        return `<strong>${params.name}</strong><br/>Health attention: ${params.value[0].toFixed(1)}%<br/>Fear emotion: ${params.value[1].toFixed(1)}%`;
      }
    },
    grid: { left: 55, right: 24, top: 30, bottom: 48 },
    xAxis: {
      name: "Health attention (%)",
      nameLocation: "middle",
      nameGap: 30,
      type: "value",
      axisLabel: { color: chartSubTextColor },
      nameTextStyle: { color: chartSubTextColor },
      axisLine: { lineStyle: { color: axisLineColor } },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    yAxis: {
      name: "Fear emotion (%)",
      nameLocation: "middle",
      nameGap: 36,
      type: "value",
      axisLabel: { color: chartSubTextColor },
      nameTextStyle: { color: chartSubTextColor },
      axisLine: { lineStyle: { color: axisLineColor } },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    series: [
      {
        type: "scatter",
        symbolSize: 12,
        data: data
      }
    ]
  });
}

function drawDominantChart() {
  if (!dominantChart) return;

  const counts = {};
  emotionList.forEach(emotion => counts[emotion] = 0);

  CITY_DATA.features.forEach(feature => {
    const emotion = feature.properties.dominant_emotion;
    if (counts[emotion] !== undefined) counts[emotion] += 1;
  });

  const xNames = emotionList.map(emotion => `${emotionEmoji[emotion]} ${emotion}`);
  const data = emotionList.map(emotion => ({
    value: counts[emotion],
    itemStyle: { color: emotionColors[emotion] }
  }));

  dominantChart.setOption({
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: 45, right: 24, top: 20, bottom: 72 },
    xAxis: {
      type: "category",
      data: xNames,
      axisLabel: { color: chartSubTextColor, interval: 0, rotate: 25 },
      axisLine: { lineStyle: { color: axisLineColor } }
    },
    yAxis: {
      type: "value",
      name: "Cities",
      axisLabel: { color: chartSubTextColor },
      nameTextStyle: { color: chartSubTextColor },
      axisLine: { lineStyle: { color: axisLineColor } },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    series: [
      {
        type: "bar",
        data: data,
        barWidth: 22,
        itemStyle: { borderRadius: [8, 8, 0, 0] },
        label: { show: true, position: "top", color: chartTextColor }
      }
    ]
  });
}

window.addEventListener("resize", () => {
  if (distributionChart) distributionChart.resize();
  if (miniDistributionChart) miniDistributionChart.resize();
  if (attentionChart) attentionChart.resize();
  if (scatterChart) scatterChart.resize();
  if (dominantChart) dominantChart.resize();
});




function recolorLayersByKeyword(map, keywords, type, prop, value) {
  const style = map.getStyle();
  if (!style || !style.layers) return;

  style.layers.forEach(layer => {
    const id = layer.id.toLowerCase();
    const hit = keywords.some(k => id.includes(k));

    if (hit && layer.type === type) {
      try {
        map.setPaintProperty(layer.id, prop, value);
      } catch (e) {}
    }
  });
}

function applyLightBlueGlobeTheme(map) {
  // 浅蓝色 globe atmosphere
  try {
    map.setFog({
      color: "#eef7fd",
      "high-color": "#dbeeff",
      "horizon-blend": 0.08,
      "space-color": "#eaf4fb",
      "star-intensity": 0.02
    });
  } catch (e) {}

  // 浅蓝白背景
  recolorLayersByKeyword(map, ["background"], "background", "background-color", "#eaf4fb");

  // 海洋
  recolorLayersByKeyword(map, ["water"], "fill", "fill-color", "#d9eaf5");
  recolorLayersByKeyword(map, ["water"], "line", "line-color", "#c8deec");

  // 陆地
  recolorLayersByKeyword(map, ["land", "landcover"], "fill", "fill-color", "#f3f8fc");
  recolorLayersByKeyword(map, ["park", "green", "vegetation"], "fill", "fill-color", "#e3f1ef");

  // 边界线
  recolorLayersByKeyword(map, ["boundary", "admin", "country", "state"], "line", "line-color", "#9fb6c8");

  const style = map.getStyle();
  if (!style || !style.layers) return;

  style.layers.forEach(layer => {
    const id = layer.id.toLowerCase();

    try {
      // 边界透明度
      if (
        layer.type === "line" &&
        (id.includes("boundary") || id.includes("admin") || id.includes("country") || id.includes("state"))
      ) {
        map.setPaintProperty(layer.id, "line-opacity", 0.38);
      }

      // 标签颜色
      if (layer.type === "symbol") {
        if (
          id.includes("label") ||
          id.includes("place") ||
          id.includes("settlement") ||
          id.includes("country") ||
          id.includes("state")
        ) {
          map.setPaintProperty(layer.id, "text-color", "#63798d");
          map.setPaintProperty(layer.id, "text-halo-color", "#f7fbff");
          map.setPaintProperty(layer.id, "text-halo-width", 1.1);
        }
      }

      // 道路线更淡
      if (layer.type === "line" && id.includes("road")) {
        map.setPaintProperty(layer.id, "line-color", "#c8d8e5");
        map.setPaintProperty(layer.id, "line-opacity", 0.35);
      }
    } catch (e) {}
  });
}


function applyLightBlueGlobeTheme(map) {
  // 浅蓝色 globe atmosphere
  try {
    map.setFog({
      color: "#eef7fd",
      "high-color": "#dbeeff",
      "horizon-blend": 0.08,
      "space-color": "#eaf4fb",
      "star-intensity": 0.02
    });
  } catch (e) {}

  // 浅蓝白背景
  recolorLayersByKeyword(map, ["background"], "background", "background-color", "#eaf4fb");

  // 海洋
  recolorLayersByKeyword(map, ["water"], "fill", "fill-color", "#d9eaf5");
  recolorLayersByKeyword(map, ["water"], "line", "line-color", "#c8deec");

  // 陆地
  recolorLayersByKeyword(map, ["land", "landcover"], "fill", "fill-color", "#f3f8fc");
  recolorLayersByKeyword(map, ["park", "green", "vegetation"], "fill", "fill-color", "#e3f1ef");

  // 边界线
  recolorLayersByKeyword(map, ["boundary", "admin", "country", "state"], "line", "line-color", "#9fb6c8");

  const style = map.getStyle();
  if (!style || !style.layers) return;

  style.layers.forEach(layer => {
    const id = layer.id.toLowerCase();

    try {
      // 边界透明度
      if (
        layer.type === "line" &&
        (id.includes("boundary") || id.includes("admin") || id.includes("country") || id.includes("state"))
      ) {
        map.setPaintProperty(layer.id, "line-opacity", 0.38);
      }

      // 标签颜色
      if (layer.type === "symbol") {
        if (
          id.includes("label") ||
          id.includes("place") ||
          id.includes("settlement") ||
          id.includes("country") ||
          id.includes("state")
        ) {
          map.setPaintProperty(layer.id, "text-color", "#63798d");
          map.setPaintProperty(layer.id, "text-halo-color", "#f7fbff");
          map.setPaintProperty(layer.id, "text-halo-width", 1.1);
        }
      }

      // 道路线更淡
      if (layer.type === "line" && id.includes("road")) {
        map.setPaintProperty(layer.id, "line-color", "#c8d8e5");
        map.setPaintProperty(layer.id, "line-opacity", 0.35);
      }
    } catch (e) {}
  });
}

