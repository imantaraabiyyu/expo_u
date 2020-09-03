package com.expo_u;

import android.app.Application;
import android.content.Context;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.github.douglasjunior.reactNativeGetLocation.ReactNativeGetLocationPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.rnnestedscrollview.RNNestedScrollViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import org.reactnative.camera.RNCameraPackage;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new RNCWebViewPackage(),
        new ReactNativeGetLocationPackage(),
        new MapsPackage(),
        new SvgPackage(),
        new FBSDKPackage(),
        new DocumentPickerPackage(),
        new AsyncStoragePackage(),
        new ImagePickerPackage(),
        new RNCameraPackage(),
        new ReanimatedPackage(),
        new RNGestureHandlerPackage(),
        new SafeAreaContextPackage(),
        new RNGoogleSigninPackage(),
        new RNNestedScrollViewPackage(),
        new LinearGradientPackage(),
        new RNTextInputMaskPackage(),
        new RNDateTimePickerPackage()
      );
      /*
       * @SuppressWarnings("UnnecessaryLocalVariable") List<ReactPackage> packages =
       * new PackageList(this).getPackages(); // Packages that cannot be autolinked
       * yet can be added manually here, for // example: // packages.add(new
       * MyReactNativePackage()); return packages;
       */
    }

    /*
     * @Override protected List<ReactPackage> getPackages() { return
     * Arrays.<ReactPackage>asList(new MainReactPackage(), new
     * ReactNativeDocumentPicker() // Add package ); }
     */

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
    /*
     * @Override protected List<ReactPackage> getPackages() { return
     * Arrays.<ReactPackage>asList( new MainReactPackage(), new
     * DocumentPickerPackage(), new FilePickerPackage() // Add package ); }
     */
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method
   * with something like initializeFlipper(this,
   * getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
    Context context,
    ReactInstanceManager reactInstanceManager
  ) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         * We use reflection here to pick up the class that initializes Flipper, since
         * Flipper library is not available in release mode
         */
        Class<?> aClass = Class.forName("com.expo_u.ReactNativeFlipper");
        aClass
          .getMethod(
            "initializeFlipper",
            Context.class,
            ReactInstanceManager.class
          )
          .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
