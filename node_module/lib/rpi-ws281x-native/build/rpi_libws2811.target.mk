# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := rpi_libws2811
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=rpi_libws2811' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-O2 \
	-Wall \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions

INCS_Debug := \
	-I/home/pi/.node-gyp/0.12.9/include/node \
	-I/home/pi/.node-gyp/0.12.9/src \
	-I/home/pi/.node-gyp/0.12.9/deps/uv/include \
	-I/home/pi/.node-gyp/0.12.9/deps/v8/include

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=rpi_libws2811' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-O2 \
	-Wall \
	-O3 \
	-ffunction-sections \
	-fdata-sections \
	-fno-tree-vrp \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions

INCS_Release := \
	-I/home/pi/.node-gyp/0.12.9/include/node \
	-I/home/pi/.node-gyp/0.12.9/src \
	-I/home/pi/.node-gyp/0.12.9/deps/uv/include \
	-I/home/pi/.node-gyp/0.12.9/deps/v8/include

OBJS := \
	$(obj).target/$(TARGET)/src/rpi_ws281x/ws2811.o \
	$(obj).target/$(TARGET)/src/rpi_ws281x/pwm.o \
	$(obj).target/$(TARGET)/src/rpi_ws281x/dma.o \
	$(obj).target/$(TARGET)/src/rpi_ws281x/mailbox.o \
	$(obj).target/$(TARGET)/src/rpi_ws281x/board_info.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic

LDFLAGS_Release := \
	-pthread \
	-rdynamic

LIBS :=

$(obj).target/rpi_libws2811.a: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/rpi_libws2811.a: LIBS := $(LIBS)
$(obj).target/rpi_libws2811.a: TOOLSET := $(TOOLSET)
$(obj).target/rpi_libws2811.a: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,alink)

all_deps += $(obj).target/rpi_libws2811.a
# Add target alias
.PHONY: rpi_libws2811
rpi_libws2811: $(obj).target/rpi_libws2811.a

# Add target alias to "all" target.
.PHONY: all
all: rpi_libws2811

# Add target alias
.PHONY: rpi_libws2811
rpi_libws2811: $(builddir)/rpi_libws2811.a

# Copy this to the static library output path.
$(builddir)/rpi_libws2811.a: TOOLSET := $(TOOLSET)
$(builddir)/rpi_libws2811.a: $(obj).target/rpi_libws2811.a FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/rpi_libws2811.a
# Short alias for building this static library.
.PHONY: rpi_libws2811.a
rpi_libws2811.a: $(obj).target/rpi_libws2811.a $(builddir)/rpi_libws2811.a

# Add static library to "all" target.
.PHONY: all
all: $(builddir)/rpi_libws2811.a

