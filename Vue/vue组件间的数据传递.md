### 父组件  --->  子组件

1. 首先**父组件中**需要有数据

   ```html
   <script>
       export default {
         name: "Login",
         data(){
           return {
             logoMsg:"xxx"
           }
         }
       }
   </script>
   ```

2. **父组件中**通过子组件属性访问这个数据

   ```html
   <template>
     <div>
       <SubDiv :logo="logoMsg"></SubDiv>
     </div>
   </template>
   ```

3. 子组件中通过props属性获取父组件传过来的logo数据

   ```html
   <script>
       export default {
         props:["logo"]
       }
   </script>
   ```

4. 子组件中使用这个logo数据

   ```html
   <template>
     <div>
       <div>{{logo}}</div>
     </div>
   </template>
   ```



### 子组件  --->   父组件

1. **子组件中**定义一个触发性事件

   ```html
   <template>
     <div>
       <input type="text" v-model="username" @change="setUser">
     </div>
   </template>
   ```

2. **子组件中**定义一个函数方法，来对应触发事件

   在 setUser 中，使用了 **$emit** 来遍历 transferUser 事件，并返回 this.username，注意这个transferUser 事件，将会在父组件中使用到。

   ```html
   <script>
       export default {
         data(){
           return {
             username:"zgq",
           }
         },
         methods:{
           setUser:function () {
             this.$emit('transferUser',this.username)
           }
         }
       }
   </script>
   ```

3. **父组件中**通过transferUser触发性事件调用一个方法

   ```html
   <template>
     <div>
       <div @transferUser="getUser"></div>
     </div>
   </template>
   ```

4. **父组件中**通过函数方法的形式可以直接获取传过来的数据，在参数中接收，并保存在data数据中

   ```html
   <script>
       export default {
         data(){
           return {
             user:"",
           }
         },
         methods:{
           getUser(msg){
             this.user=msg;
           }
         }
       }
   </script>
   ```

5. **父组件中**直接通过使用data中的数据，实现数据的使用

   ```html
   <template>
     <div>
       <div @transferUser="getUser"></div>
       <p>
           {{user}}
         </p>
     </div>
   </template>
   ```



### 兄弟组件间的数据传递

使用vuex数据管理。







